/**
 * ============================================================
 *  SITE CONFIG — edit this file to customise the portfolio
 * ============================================================
 *
 *  Projects  → src/data/projects.ts
 *  Skills    → src/data/skills.ts
 *  Social    → src/data/social.ts
 *  Colours   → tailwind.config.ts  (bg, surface, accent)
 */

// ── Types ────────────────────────────────────────────────────────────────────
import type { SiteSettings, TechCategory } from '../types';
import { socialLinks } from './social';

export type { TechCategory };

export interface CoreSkillEntry {
  /** Lucide icon name (string key) */
  icon: string;
  label: string;
  detail: string;
}

export interface TechEntry {
  label: string;
  /** Lucide icon name (string key) */
  icon: string;
  category: TechCategory;
}

// ── Identity ─────────────────────────────────────────────────────────────────
export const identity = {
  name:    'Rochee Faverey',
  email:   'rocheefaverey@hotmail.com',
  cvPath:  '/Rochee-Faverey-CV.pdf',
  avatar:  '/images/Profile-picture.png',
  tagline: 'Designing meaningful interactions between humans and technology',
};

// ── Hero — animated role strip ────────────────────────────────────────────────
export const roles: string[] = [
  'Game Developer',
  '3D Artist',
  'Frontend Developer',
  'Creative Coder',
];

// ── About section ─────────────────────────────────────────────────────────────
export const about = {
  /** Short paragraphs shown in the about column */
  paragraphs: [
    "I'm a Communication & Multimedia Design graduate from Avans University in Breda, currently interning at Live Wall where I'm deepening my frontend development skills.",
    'I specialise in game system design, immersive XR experiences, and technical art — and I bring that same care for interaction and craft to web interfaces.',
  ],
  /** Faint line shown below the paragraphs */
  institution: 'Frontend Intern @ Live Wall · CMD Graduate, Avans University of Applied Sciences',
  /** 4-cell micro-skill grid — add/remove entries freely */
  coreSkills: [
    { icon: 'Code',      label: 'Development', detail: 'Unity, C#, React, TypeScript'  },
    { icon: 'Box',       label: '3D & Visual', detail: 'Blender, Substance, Animation' },
    { icon: 'Eye',       label: 'Creative Tech', detail: 'Arduino, OpenCV, XR'         },
    { icon: 'Lightbulb', label: 'Design',      detail: 'UX, Figma, Prototyping'        },
  ] satisfies CoreSkillEntry[],
};

// ── Tech badge strip (shown below about text) ─────────────────────────────────
// category controls badge colour:
//   engine   → violet   language → blue   tool → accent   design → emerald
export const techStack: TechEntry[] = [
  { label: 'Unity',      icon: 'Gamepad2',      category: 'engine'   },
  { label: 'React',      icon: 'Code2',         category: 'engine'   },
  { label: 'TypeScript', icon: 'Code2',         category: 'language' },
  { label: 'C#',         icon: 'Code2',         category: 'language' },
  { label: 'Python',     icon: 'Terminal',      category: 'language' },
  { label: 'Blender',    icon: 'Box',           category: 'tool'     },
  { label: 'OpenCV',     icon: 'Eye',           category: 'tool'     },
  { label: 'Figma',      icon: 'MousePointer2', category: 'design'   },
  { label: 'UX / XR',   icon: 'MousePointer2', category: 'design'   },
];

// ── Stats bar ─────────────────────────────────────────────────────────────────
/** The year you started — "Years Experience" counter = currentYear − startYear */
export const startYear = 2023;

// ── SEO defaults ──────────────────────────────────────────────────────────────
export const seo = {
  siteTitle:   `${identity.name} — Portfolio`,
  description: `Portfolio of ${identity.name} — Frontend Developer, Game Developer, 3D Artist & Creative Coder. Currently interning at Live Wall.`,
  siteUrl:     'https://rocheefaverey.com',
};

const englishUi = {
  back: 'Back',
  contact: 'Contact',
  copyEmail: 'Copy Email',
  copied: 'Copied!',
  downloadCv: 'Download CV',
  expertise: 'Expertise',
  featured: 'Featured',
  goBack: 'Go Back',
  goHome: 'Go Home',
  home: 'Home',
  keyHighlights: 'Key Highlights',
  languageEnglish: 'English',
  languageDutch: 'Dutch',
  notFoundDescription: "The page you're looking for doesn't exist or has been moved.",
  notFoundEyebrow: 'Error 404',
  notFoundTitle: 'Page Not Found',
  processTitle: 'Development Process',
  projectVideo: 'Project Video',
  projects: 'Projects',
  readMore: 'Read More',
  skillsTitle: 'Core Skills',
  statsProjects: 'Projects',
  statsTechnologies: 'Technologies',
  statsYears: 'Years Experience',
  technologiesTitle: 'Technologies & Tools',
  viewAllProjects: 'View all projects',
  viewProject: 'View project',
  viewProjects: 'View Projects',
  whoIAm: 'Who I Am',
  work: 'Work',
};

const dutchUi = {
  back: 'Terug',
  contact: 'Contact',
  copyEmail: 'E-mail kopieren',
  copied: 'Gekopieerd!',
  downloadCv: 'Download cv',
  expertise: 'Expertise',
  featured: 'Uitgelicht',
  goBack: 'Ga terug',
  goHome: 'Naar home',
  home: 'Home',
  keyHighlights: 'Belangrijkste punten',
  languageEnglish: 'Engels',
  languageDutch: 'Nederlands',
  notFoundDescription: 'De pagina die je zoekt bestaat niet of is verplaatst.',
  notFoundEyebrow: 'Fout 404',
  notFoundTitle: 'Pagina niet gevonden',
  processTitle: 'Ontwikkelproces',
  projectVideo: 'Projectvideo',
  projects: 'Projecten',
  readMore: 'Lees meer',
  skillsTitle: 'Kernvaardigheden',
  statsProjects: 'Projecten',
  statsTechnologies: 'Technologieen',
  statsYears: 'Jaar ervaring',
  technologiesTitle: 'Technologieen & tools',
  viewAllProjects: 'Bekijk alle projecten',
  viewProject: 'Bekijk project',
  viewProjects: 'Bekijk projecten',
  whoIAm: 'Wie ik ben',
  work: 'Werk',
};

export const siteSettings: SiteSettings = {
  locale: 'en',
  identity,
  seo,
  roles,
  about,
  techStack,
  socialLinks,
  startYear,
  ui: englishUi,
};

export const fallbackSiteSettings: Record<'en' | 'nl', SiteSettings> = {
  en: siteSettings,
  nl: {
    ...siteSettings,
    locale: 'nl',
    identity: {
      ...identity,
      tagline: 'Betekenisvolle interacties ontwerpen tussen mensen en technologie',
    },
    seo: {
      ...seo,
      siteTitle: `${identity.name} — Portfolio`,
      description: `Portfolio van ${identity.name} — frontend developer, game developer, 3D artist en creative coder.`,
    },
    about: {
      ...about,
      paragraphs: [
        'Ik ben afgestudeerd in Communication & Multimedia Design aan Avans Hogeschool in Breda en loop momenteel stage bij Live Wall, waar ik mijn frontend development skills verder verdiep.',
        'Ik specialiseer me in game system design, immersive XR experiences en technical art — en neem diezelfde aandacht voor interactie en vakmanschap mee naar webinterfaces.',
      ],
      institution: 'Frontend stagiair @ Live Wall · CMD afgestudeerd, Avans Hogeschool',
    },
    ui: dutchUi,
  },
};
