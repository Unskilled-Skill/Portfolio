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
export type TechCategory = 'engine' | 'language' | 'tool' | 'design';

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
