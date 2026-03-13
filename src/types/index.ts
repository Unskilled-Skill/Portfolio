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
