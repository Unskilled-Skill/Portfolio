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
  'Creative Coder',
  'Technical Designer',
];

// ── About section ─────────────────────────────────────────────────────────────
export const about = {
  /** Short paragraphs shown in the about column */
  paragraphs: [
    "I'm a Communication & Multimedia Design student at Avans University in Breda, with a deep passion for the intersection of technology and creative design.",
    'I specialize in game system design, interactive experiences, and technical art pipelines — building meaningful connections between humans and the digital world.',
  ],
  /** Faint line shown below the paragraphs */
  institution: 'CMD Student @ Avans University of Applied Sciences',
  /** 4-cell micro-skill grid — add/remove entries freely */
  coreSkills: [
    { icon: 'Code',      label: 'Development', detail: 'Unity, C#, Python'             },
    { icon: 'Box',       label: '3D',          detail: 'Blender, Substance, Animation' },
    { icon: 'Eye',       label: 'Vision',      detail: 'OpenCV, AI applications'       },
    { icon: 'Lightbulb', label: 'Design',      detail: 'UX, Prototyping, XR'          },
  ] satisfies CoreSkillEntry[],
};

// ── Tech badge strip (shown below about text) ─────────────────────────────────
// category controls badge colour:
//   engine   → violet   language → blue   tool → accent   design → emerald
export const techStack: TechEntry[] = [
  { label: 'Unity',     icon: 'Gamepad2',      category: 'engine'   },
  { label: 'C#',        icon: 'Code2',         category: 'language' },
  { label: 'Python',    icon: 'Terminal',      category: 'language' },
  { label: 'Blender',   icon: 'Box',           category: 'tool'     },
  { label: 'Substance', icon: 'Layers',        category: 'tool'     },
  { label: 'OpenCV',    icon: 'Eye',           category: 'tool'     },
  { label: 'UX / XR',  icon: 'MousePointer2', category: 'design'   },
];

// ── Stats bar ─────────────────────────────────────────────────────────────────
/** The year you started — "Years Experience" counter = currentYear − startYear */
export const startYear = 2023;

// ── SEO defaults ──────────────────────────────────────────────────────────────
export const seo = {
  siteTitle:   `${identity.name} — Portfolio`,
  description: `Portfolio of ${identity.name} — Game Developer, Technical Designer, 3D Artist & Creative Coder.`,
};
