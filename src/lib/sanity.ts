import type { Locale, Project, SiteSettings, Skill } from '../types';
import { projects as fallbackProjects } from '../data/projects';
import { skills as fallbackSkills } from '../data/skills';
import { fallbackSiteSettings } from '../data/site';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-05-08';
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false';

export const isSanityConfigured = Boolean(projectId && dataset);

const apiHost = useCdn ? 'apicdn.sanity.io' : 'api.sanity.io';
const baseUrl = isSanityConfigured
  ? `https://${projectId}.${apiHost}/v${apiVersion}/data/query/${dataset}`
  : '';

const imageUrl = (assetRef?: string | null): string | null => {
  if (!assetRef || !projectId || !dataset) {
    return null;
  }

  const match = assetRef.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/i);
  if (!match) {
    return null;
  }

  const [, id, dimensions, extension] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${extension}`;
};

async function sanityFetch<T>(query: string): Promise<T> {
  if (!baseUrl) {
    throw new Error('Sanity is not configured');
  }

  const response = await fetch(`${baseUrl}?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Sanity request failed: ${response.status}`);
  }

  const body = (await response.json()) as { result: T };
  return body.result;
}

type SanityProject = Partial<Omit<Project, 'heroImage' | 'gallery'>> & {
  slug?: string;
  title?: string;
  subtitle?: string;
  overview?: string;
  meta?: Project['meta'];
  highlights?: string[];
  bodySections?: Project['bodySections'];
  navOrder?: number;
  featured?: boolean;
  spotlightDirection?: Project['spotlightDirection'];
  prevSlug?: string;
  nextSlug?: string;
  process?: Project['process'];
  heroImage?: string | null;
  heroImageUrl?: string | null;
  heroImageAssetRef?: string | null;
  gallery?: Array<{
    src?: string | null;
    imageUrl?: string | null;
    assetRef?: string | null;
    alt?: string | null;
    overlay?: string | null;
  }>;
};

const projectFields = `{
  language,
  "slug": slug.current,
  title,
  subtitle,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAssetRef": heroImage.asset._ref,
  "heroImage": heroImageFallback,
  youtubeId,
  overview,
  meta,
  gallery[]{
    "imageUrl": image.asset->url,
    "assetRef": image.asset._ref,
    "src": src,
    alt,
    overlay
  },
  highlights,
  bodySections,
  navOrder,
  featured,
  spotlightDirection,
  prevSlug,
  nextSlug,
  process
}`;

const siteSettingsFields = `{
  language,
  identity{
    ...,
    "avatar": coalesce(avatarImage.asset->url, avatar)
  },
  seo,
  roles,
  about,
  techStack,
  socialLinks,
  startYear,
  ui
}`;

const normalizeProject = (project: SanityProject): Project => ({
  slug: project.slug || '',
  title: project.title || 'Untitled Project',
  subtitle: project.subtitle || '',
  heroImage:
    project.heroImageUrl ||
    imageUrl(project.heroImageAssetRef) ||
    project.heroImage ||
    '/images/placeholder-blue.svg',
  youtubeId: project.youtubeId || null,
  overview: project.overview || '',
  meta: {
    role: project.meta?.role || '',
    tools: project.meta?.tools || '',
    focus: project.meta?.focus || '',
  },
  gallery: (project.gallery || []).map((image) => ({
    src: image.imageUrl || imageUrl(image.assetRef) || image.src || '/images/placeholder-blue.svg',
    alt: image.alt || project.title || 'Project image',
    overlay: image.overlay || '',
  })),
  highlights: project.highlights || [],
  bodySections: project.bodySections || [],
  navOrder: project.navOrder ?? 999,
  featured: project.featured ?? false,
  spotlightDirection: project.spotlightDirection || 'right',
  prevSlug: project.prevSlug || '',
  nextSlug: project.nextSlug || '',
  process: project.process || [],
});

export async function fetchProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(navOrder asc) ${projectFields}`;
  const sanityProjects = await sanityFetch<SanityProject[]>(query);
  return sanityProjects.map(normalizeProject);
}

export async function fetchProjectsByLocale(locale: Locale): Promise<Project[]> {
  const query = `*[_type == "project" && language == "${locale}"] | order(navOrder asc) ${projectFields}`;
  const sanityProjects = await sanityFetch<SanityProject[]>(query);
  return sanityProjects.map(normalizeProject);
}

export async function fetchSkills(locale: Locale): Promise<Skill[]> {
  const languageFilter = ` && language == "${locale}"`;
  const query = `*[_type == "skill"${languageFilter}] | order(order asc) {language, icon, label, description}`;
  return sanityFetch<Skill[]>(query);
}

export async function fetchSiteSettings(locale: Locale): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings" && language in ["${locale}", "en"]] | order(language == "${locale}" desc)[0] ${siteSettingsFields}`;
  return sanityFetch<SiteSettings | null>(query);
}

export async function getProjects(locale: Locale = 'en'): Promise<Project[]> {
  if (!isSanityConfigured) {
    return fallbackProjects;
  }

  try {
    const sanityProjects = await fetchProjectsByLocale(locale);
    if (sanityProjects.length) {
      return sanityProjects;
    }

    const englishProjects = locale === 'en' ? [] : await fetchProjectsByLocale('en');
    return englishProjects.length ? englishProjects : fallbackProjects;
  } catch (error) {
    console.warn(error);
    return fallbackProjects;
  }
}

export async function getSkills(locale: Locale = 'en'): Promise<Skill[]> {
  if (!isSanityConfigured) {
    return fallbackSkills;
  }

  try {
    const sanitySkills = await fetchSkills(locale);
    if (sanitySkills.length) {
      return sanitySkills;
    }

    const englishSkills = locale === 'en' ? [] : await fetchSkills('en');
    return englishSkills.length ? englishSkills : fallbackSkills;
  } catch (error) {
    console.warn(error);
    return fallbackSkills;
  }
}

export async function getSiteSettings(locale: Locale = 'en'): Promise<SiteSettings> {
  const fallback = fallbackSiteSettings[locale];

  if (!isSanityConfigured) {
    return fallback;
  }

  try {
    const settings = await fetchSiteSettings(locale);
    return settings ? { ...fallback, ...settings, locale } : fallback;
  } catch (error) {
    console.warn(error);
    return fallback;
  }
}
