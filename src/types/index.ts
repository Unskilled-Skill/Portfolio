export interface GalleryImage {
  src: string;
  alt: string;
  overlay: string;
}

export interface ProjectMeta {
  role: string;
  tools: string;
  focus: string;
}

export interface BodySection {
  title?: string;
  paragraphs: string[];
  list?: string[];
}

export interface ProcessStep {
  phase: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  youtubeId: string | null;
  overview: string;
  meta: ProjectMeta;
  gallery: GalleryImage[];
  highlights: string[];
  bodySections: BodySection[];
  navOrder: number;
  featured: boolean;          // show as spotlight on homepage
  spotlightDirection: 'left' | 'right';
  prevSlug: string;
  nextSlug: string;
  process: ProcessStep[];
}

export interface Skill {
  icon: string;
  label: string;
  description: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export type Locale = 'en' | 'nl';

export interface LocalizedText {
  en: string;
  nl: string;
}

export interface CoreSkillEntry {
  icon: string;
  label: string;
  detail: string;
}

export type TechCategory = 'engine' | 'language' | 'tool' | 'design';

export interface TechEntry {
  label: string;
  icon: string;
  category: TechCategory;
}

export interface SiteIdentity {
  name: string;
  email: string;
  cvPath: string;
  avatar: string;
  tagline: string;
}

export interface SiteSeo {
  siteTitle: string;
  description: string;
  siteUrl: string;
}

export interface SiteAbout {
  paragraphs: string[];
  institution: string;
  coreSkills: CoreSkillEntry[];
}

export interface SiteUiText {
  back: string;
  contact: string;
  copyEmail: string;
  copied: string;
  downloadCv: string;
  expertise: string;
  featured: string;
  goBack: string;
  goHome: string;
  home: string;
  keyHighlights: string;
  languageEnglish: string;
  languageDutch: string;
  notFoundDescription: string;
  notFoundEyebrow: string;
  notFoundTitle: string;
  processTitle: string;
  projectVideo: string;
  projects: string;
  readMore: string;
  skillsTitle: string;
  statsProjects: string;
  statsTechnologies: string;
  statsYears: string;
  technologiesTitle: string;
  viewAllProjects: string;
  viewProject: string;
  viewProjects: string;
  whoIAm: string;
  work: string;
  // Redesign — editable display copy
  available: string;
  heroLocation: string;
  metaRole: string;
  metaStudying: string;
  metaFocus: string;
  workTitle: string;
  aboutLabel: string;
  aboutTitle: string;
  whatIDo: string;
  contactHeadline: string;
  emailLabel: string;
  footerNote: string;
  backToTop: string;
  selectedWork: string;
  projectsTagline: string;
  location: string;
  moreProjects: string;
  workWithMe: string;
  processHeadline: string;
  galleryLabel: string;
  galleryHeadline: string;
  frames: string;
  allWork: string;
  nextProject: string;
  prevProject: string;
}

export interface SiteSettings {
  locale: Locale;
  identity: SiteIdentity;
  seo: SiteSeo;
  roles: string[];
  about: SiteAbout;
  techStack: TechEntry[];
  socialLinks: SocialLink[];
  startYear: number;
  ui: SiteUiText;
}
