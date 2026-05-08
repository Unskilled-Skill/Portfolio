import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sucrase from 'sucrase';
import { createClient } from '@sanity/client';
import { getCliClient } from 'sanity/cli';

const require = createRequire(import.meta.url);
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const { transform: transformSync } = sucrase;
const moduleCache = new Map();

function loadTsModule(relativePath) {
  const filename = resolve(root, relativePath);
  if (moduleCache.has(filename)) {
    return moduleCache.get(filename).exports;
  }

  const source = readFileSync(filename, 'utf8');
  const { code } = transformSync(source, {
    transforms: ['typescript', 'imports'],
    filePath: filename,
  });

  const mod = { exports: {} };
  moduleCache.set(filename, mod);
  const localRequire = (specifier) => {
    if (specifier === '../types') {
      return {};
    }

    if (specifier.startsWith('.')) {
      const childPath = resolve(filename, '..', `${specifier}.ts`);
      if (childPath.startsWith(root)) {
        return loadTsModule(childPath.slice(root.length + 1));
      }
    }

    return require(specifier);
  };

  new Function('require', 'module', 'exports', code)(localRequire, mod, mod.exports);
  return mod.exports;
}

const { projects } = loadTsModule('src/data/projects.ts');
const { skills } = loadTsModule('src/data/skills.ts');
const { fallbackSiteSettings } = loadTsModule('src/data/site.ts');

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'sl7hlzy0';
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production';

const clientConfig = {
  projectId,
  dataset,
  apiVersion: '2026-05-08',
  useCdn: false,
};

const client = process.env.SANITY_AUTH_TOKEN
  ? createClient({ ...clientConfig, token: process.env.SANITY_AUTH_TOKEN })
  : getCliClient(clientConfig);

const documentId = (type, slug) => `${type}.${slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}`;

function projectDocument(project) {
  return {
    _id: documentId('project', `en-${project.slug}`),
    _type: 'project',
    language: 'en',
    title: project.title,
    slug: {
      _type: 'slug',
      current: project.slug,
    },
    subtitle: project.subtitle,
    heroImageFallback: project.heroImage,
    youtubeId: project.youtubeId,
    overview: project.overview,
    meta: project.meta,
    gallery: project.gallery.map((image, index) => ({
      _key: `${project.slug}-gallery-${index}`,
      src: image.src,
      alt: image.alt,
      overlay: image.overlay,
    })),
    highlights: project.highlights,
    bodySections: project.bodySections.map((section, index) => ({
      _key: `${project.slug}-body-${index}`,
      ...section,
    })),
    navOrder: project.navOrder,
    featured: project.featured,
    spotlightDirection: project.spotlightDirection,
    prevSlug: project.prevSlug,
    nextSlug: project.nextSlug,
    process: project.process.map((step, index) => ({
      _key: `${project.slug}-process-${index}`,
      ...step,
    })),
  };
}

function skillDocument(skill, index) {
  return {
    _id: documentId('skill', `en-${skill.label}`),
    _type: 'skill',
    language: 'en',
    ...skill,
    order: index + 1,
  };
}

function siteSettingsDocument(settings) {
  return {
    _id: documentId('siteSettings', settings.locale),
    _type: 'siteSettings',
    language: settings.locale,
    identity: settings.identity,
    seo: settings.seo,
    roles: settings.roles,
    about: settings.about,
    techStack: settings.techStack.map((entry, index) => ({
      _key: `${settings.locale}-tech-${index}`,
      ...entry,
    })),
    socialLinks: settings.socialLinks.map((link, index) => ({
      _key: `${settings.locale}-social-${index}`,
      ...link,
    })),
    startYear: settings.startYear,
    ui: settings.ui,
  };
}

const docs = [
  ...Object.values(fallbackSiteSettings).map(siteSettingsDocument),
  ...projects.map(projectDocument),
  ...skills.map(skillDocument),
];

let transaction = client.transaction();
for (const doc of docs) {
  transaction = transaction.createOrReplace(doc);
}

await transaction.commit();
console.log(`Seeded ${Object.keys(fallbackSiteSettings).length} site settings, ${projects.length} projects, and ${skills.length} skills into ${projectId}/${dataset}.`);
