import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'ar-you-ready',
    title: 'AR You Ready?',
    subtitle: 'Future Mundane Game',
    heroImage: '/images/ar-game1.png',
    youtubeId: 'wY0fYOmywGM',
    overview:
      'A speculative game exploring social isolation in 2050 Netherlands, created for Planbureau voor de Leefomgeving. Players navigate a hyper-connected world where constant AR notifications strain human relationships.',
    meta: {
      role: 'Design & Development',
      tools: 'Unity, C# \u2022 Blender',
      focus: 'AR UX \u2022 Narrative systems',
    },
    gallery: [
      { src: '/images/ar-game1.png', alt: 'Future City', overlay: 'Starting Room' },
      { src: '/images/ar-game2.png', alt: 'UI', overlay: 'Apartment' },
      { src: '/images/ar-game3.png', alt: 'Gameplay', overlay: 'NPCs' },
      { src: '/images/ar-game4.png', alt: 'Development', overlay: 'Particle effects' },
      { src: '/images/ar-game5.png', alt: 'Character', overlay: 'Triggerable events' },
      { src: '/images/ar-game6.png', alt: 'Tech', overlay: 'Waypoint/Objective system' },
    ],
    highlights: [
      'Future mundane storytelling',
      'Social impact of pervasive AR',
      'Linear narrative design',
      'Urban future visualization',
    ],
    bodySections: [
      {
        title: 'AR You Ready \u2014 Linear Story-Based First-Person Game',
        paragraphs: [
          'This project was created for the Planbureau voor de Leefomgeving (PBL) as part of the "Snelle Wereld" future scenario \u2014 a vision of 2050 where technology dominates everyday life. The goal was to design an immersive story experience that shows how constant digital connectivity affects human focus and relationships.',
          'AR You Ready is a first-person narrative game that tells a linear story about a journalist in the year 2050. The player sees the world through the journalist\u2019s AR glasses, which continuously send notifications, calls, and updates. As he goes about his day \u2014 working, commuting, and trying to meet a friend \u2014 he\u2019s constantly interrupted by the demands of his smart devices. In the end, he arrives late, realizing how the fast, connected world has distanced him from real human moments.',
        ],
      },
      {
        title: 'My Role & Contributions',
        paragraphs: [
          'I was responsible for much of the programming and world-building, helping create the technical systems that drive the story. My main contributions included:',
        ],
        list: [
          'Developing a dynamic objective system to structure the player\u2019s progression through the story.',
          'Building waypoint systems and event triggers to control pacing and transitions.',
          'Implementing a progressive, event-based system using interactive boxes to manage scene flow.',
          'Designing and constructing the world environment, including both indoor and outdoor areas.',
          'Working on subtitles, dialogue timing, and voicing several characters to enhance immersion.',
        ],
      },
      {
        paragraphs: [
          'This project taught me how to integrate narrative and system design in a linear format \u2014 ensuring the story unfolds smoothly while the world feels alive and reactive. Through coding, storytelling, and sound design, I helped create a believable glimpse into the fast, tech-driven future of 2050.',
        ],
      },
    ],
    navOrder: 1,
    featured: true,
    spotlightDirection: 'right',
    prevSlug: 'rhythm-game',
    nextSlug: 'ocean-cleaner',
    process: [
      { phase: 'Research',    description: 'Studied PBL\'s Snelle Wereld scenario and defined the rules of the 2050 world.' },
      { phase: 'Concept',     description: 'Designed the narrative arc, journalist character, and key AR interaction moments.' },
      { phase: 'Prototype',   description: 'Built core systems in Unity: waypoints, objective manager, and event triggers.' },
      { phase: 'Production',  description: 'Constructed indoor and outdoor environments, dialogue timing, and character voicing.' },
      { phase: 'Polish',      description: 'Added particle effects, sound design, and fine-tuned pacing for a smooth story flow.' },
    ],
  },
  {
    slug: 'ocean-cleaner',
    title: 'Ocean Cleaner',
    subtitle: 'Eco Game',
    heroImage: '/images/coral-game1.jpg',
    youtubeId: 'puReUI5vfM0',
    overview:
      'An underwater cleaning simulator inspired by power-wash mechanics, designed to teach about ocean conservation through hands-on gameplay.',
    meta: {
      role: 'Design & Development',
      tools: 'Unity, C# \u2022 Blender',
      focus: 'Education \u2022 Game systems',
    },
    gallery: [
      { src: '/images/coral-game1.jpg', alt: 'Reef', overlay: 'Reef' },
      { src: '/images/coral-game2.jpg', alt: 'Cleaning', overlay: 'Cleaning Coral' },
      { src: '/images/coral-game3.jpg', alt: 'Restoration', overlay: 'Removing invasive species' },
      { src: '/images/coral-game4.jpg', alt: 'Tools', overlay: 'Urchins deposit bin' },
      { src: '/images/coral-game5.jpg', alt: 'Species', overlay: 'Dynamic fish biomes' },
      { src: '/images/coral-game6.jpg', alt: 'UI', overlay: 'Main Menu' },
    ],
    highlights: [
      'Remove pollution & invasive species',
      'Restore coral reef ecosystems',
      'Child-friendly educational content',
      'Relaxing cleaning mechanics',
    ],
    bodySections: [
      {
        title: 'Underwater Cleanup Simulator',
        paragraphs: [
          'In this educational game, players explore the ocean floor and clean up trash that harms coral reefs and sea life. The goal is to make children more aware of their connection to nature and to build empathy for coral reefs, which often feel distant from everyday life.',
          'The game was developed in Unity and is inspired by a mix of Slime Rancher and PowerWash Simulator. From Slime Rancher, I borrowed the idea of a vacuum tool for collecting items, while PowerWash Simulator inspired the satisfying cleaning mechanics and sense of progress as the environment becomes cleaner and more vibrant.',
          'During development, I focused on creating an immersive and dynamic underwater world:',
        ],
        list: [
          'Ships bob naturally on the waves, adding life to the surface.',
          'Fish follow custom path systems, bringing motion and atmosphere to the ocean.',
          'Sea urchins have sticky physics, creating playful, interactive elements.',
        ],
      },
      {
        paragraphs: [
          'Through these details, Underwater Cleanup Simulator blends relaxing gameplay with environmental education, encouraging players \u2014 especially children \u2014 to care for the ocean and understand the impact of keeping it clean.',
        ],
      },
    ],
    navOrder: 2,
    featured: true,
    spotlightDirection: 'left',
    prevSlug: 'ar-you-ready',
    nextSlug: 'smart-parking',
    process: [
      { phase: 'Research',    description: 'Analysed ocean education goals and reference titles like Slime Rancher and PowerWash Simulator.' },
      { phase: 'Concept',     description: 'Designed the vacuum mechanic, cleanup loop, and species interaction model.' },
      { phase: 'Prototype',   description: 'Implemented the vacuum tool, physics behaviours for urchins, and basic reef layout.' },
      { phase: 'Production',  description: 'Built the full underwater world with custom fish path systems and bobbing ship physics.' },
      { phase: 'Polish',      description: 'Refined UI, main menu, child-friendly visual tone, and overall game feel.' },
    ],
  },
  {
    slug: 'smart-parking',
    title: 'Smart Parking Vision',
    subtitle: 'Integrated Parking System',
    heroImage: '/images/parking1.jpg',
    youtubeId: null,
    overview:
      'A computer vision solution for TU Delft Science Center that detects available parking spots and guides drivers to optimal locations via mobile app.',
    meta: {
      role: 'Computer Vision & Prototyping',
      tools: 'Python, OpenCV',
      focus: 'Detection \u2022 Routing',
    },
    gallery: [
      { src: '/images/parking1.jpg', alt: 'System Overview', overlay: 'Overview' },
      { src: '/images/parking2.jpg', alt: 'Detection', overlay: 'Maquette parking place' },
      { src: '/images/parking3.jpg', alt: 'App', overlay: 'Instructions usage poster' },
      { src: '/images/parking4.jpg', alt: 'Model', overlay: 'Toy auto navigating Car' },
      {
        src: '/images/parking5.jpg',
        alt: 'Car',
        overlay: 'Robot Car navigating line following algorithm',
      },
      {
        src: '/images/parking6.jpg',
        alt: 'Tech',
        overlay: 'Parking spot detecting program using OpenCV',
      },
    ],
    highlights: [
      'Real-time space detection (OpenCV/Python)',
      'Optimal routing algorithm',
      'Interactive model with robot car',
      'User-friendly mobile interface',
    ],
    bodySections: [
      {
        title: 'Smart Parking System \u2014 Interactive Exhibition',
        paragraphs: [
          'This project explores how smart systems can make everyday life more efficient and interactive. The concept was to create a smart parking assistant that uses computer vision (OpenCV) and real-time camera footage to detect open parking spaces. Based on the location of a store or destination, the system recommends the closest available parking spot and guides users there using a navigation API and a small robot.',
          'The idea was further developed into an interactive exhibition for TU Delft, designed to make the concept tangible and fun for visitors \u2014 especially children. We built a miniature white maquette of a city layout, where users could move around, change destinations, and see how the system responds in real time.',
          'During development, I focused on:',
        ],
        list: [
          'Implementing OpenCV image detection to identify free parking spaces from live footage.',
          'Connecting the vision system with a pathfinding API for navigation.',
          'Programming a robot car to move to the suggested parking spot.',
          'Designing the interactive physical setup to make the invisible data systems visible and understandable.',
        ],
      },
      {
        paragraphs: [
          'This project fits perfectly within the Integrated Smart Systems module: it demonstrates how connected data, sensors, and user interaction can work together to create a meaningful experience. The goal was to show how smart systems can anticipate human needs and make technology feel both intelligent and approachable.',
        ],
      },
    ],
    navOrder: 3,
    featured: true,
    spotlightDirection: 'right',
    prevSlug: 'ocean-cleaner',
    nextSlug: 'vr-escape-room',
    process: [
      { phase: 'Research',    description: 'Studied TU Delft\'s exhibition needs and evaluated computer vision approaches with OpenCV.' },
      { phase: 'Concept',     description: 'Designed the end-to-end system: camera feed → space detection → routing → robot navigation.' },
      { phase: 'Build',       description: 'Implemented the OpenCV detection pipeline and connected it to a pathfinding API.' },
      { phase: 'Prototype',   description: 'Programmed the robot car and constructed the physical miniature city maquette.' },
      { phase: 'Exhibition',  description: 'Designed the mobile interface, interactive setup, and tested the full system with visitors.' },
    ],
  },
  // ─── TEMPLATE PROJECTS ──────────────────────────────────────────────────────
  {
    slug: 'vr-escape-room',
    title: 'VR Escape Room',
    subtitle: 'Immersive XR Experience',
    heroImage: '/images/ar-game1.png',
    youtubeId: null,
    overview:
      'A fully immersive VR escape room designed to test spatial reasoning and problem-solving. Players manipulate physical puzzles in a hand-tracked environment, uncovering a mystery across three connected rooms.',
    meta: {
      role: 'Design & Development',
      tools: 'Unity, C# • XR Toolkit',
      focus: 'VR UX • Spatial Design',
    },
    gallery: [
      { src: '/images/ar-game1.png', alt: 'Room 1', overlay: 'Entry Room' },
      { src: '/images/ar-game2.png', alt: 'Puzzle', overlay: 'Puzzle Station' },
      { src: '/images/ar-game3.png', alt: 'Room 2', overlay: 'Library Room' },
      { src: '/images/ar-game4.png', alt: 'Interaction', overlay: 'Hand Tracking' },
      { src: '/images/ar-game5.png', alt: 'Room 3', overlay: 'Final Chamber' },
      { src: '/images/ar-game6.png', alt: 'UI', overlay: 'Diegetic UI' },
    ],
    highlights: [
      'Full hand tracking (no controllers)',
      'Three interconnected rooms',
      'Physics-based puzzle mechanics',
      'Diegetic UI — no HUD overlays',
    ],
    bodySections: [
      {
        title: 'Designing for Presence',
        paragraphs: [
          'The goal was to build a VR experience that felt tangible rather than gamey. Every interaction \u2014 pulling levers, stacking objects, turning dials \u2014 was designed around hand tracking so the player\u2019s own hands become the interface.',
          'Spatial audio cues guide attention without arrows or waypoints, keeping the player immersed while still providing direction.',
        ],
      },
      {
        title: 'My Role & Contributions',
        paragraphs: ['I designed and built the full experience solo, covering:'],
        list: [
          'XR Toolkit hand-tracking interaction system.',
          'Three room layouts with interconnected puzzle logic.',
          'Spatial audio and ambient sound design.',
          'Performance optimisation for standalone VR headset.',
        ],
      },
    ],
    navOrder: 4,
    featured: false,
    spotlightDirection: 'left',
    prevSlug: 'smart-parking',
    nextSlug: 'procedural-dungeon',
    process: [
      { phase: 'Research',   description: 'Studied VR comfort guidelines and hand-tracking capabilities of the target headset.' },
      { phase: 'Concept',    description: 'Designed three interconnected rooms and a narrative thread connecting each puzzle.' },
      { phase: 'Prototype',  description: 'Built hand-tracking interaction prototypes and tested for comfort and precision.' },
      { phase: 'Production', description: 'Constructed full environments, implemented all puzzles, and added spatial audio.' },
      { phase: 'Polish',     description: 'Ran playtests, tuned difficulty curve, and optimised for standalone VR performance.' },
    ],
  },
  {
    slug: 'procedural-dungeon',
    title: 'Procedural Dungeon Generator',
    subtitle: 'Technical Game System',
    heroImage: '/images/ar-game3.png',
    youtubeId: null,
    overview:
      'A runtime dungeon generation system built in Unity that creates infinite, playable layouts using BSP partitioning and wave-function collapse for tile placement. Designed as a reusable module for future game projects.',
    meta: {
      role: 'Systems Programming',
      tools: 'Unity, C#',
      focus: 'Procedural Generation • Architecture',
    },
    gallery: [
      { src: '/images/ar-game3.png', alt: 'Generated Map', overlay: 'Generated Layout' },
      { src: '/images/ar-game4.png', alt: 'Room Types', overlay: 'Room Varieties' },
      { src: '/images/ar-game5.png', alt: 'Corridors', overlay: 'Corridor System' },
      { src: '/images/ar-game6.png', alt: 'Debug View', overlay: 'BSP Debug View' },
      { src: '/images/ar-game1.png', alt: 'In-Game', overlay: 'Runtime Result' },
      { src: '/images/ar-game2.png', alt: 'Tile Set', overlay: 'Modular Tile Set' },
    ],
    highlights: [
      'BSP room partitioning',
      'Wave-function collapse tile fitting',
      'Runtime generation — no loading screen',
      'Serializable seed system',
    ],
    bodySections: [
      {
        title: 'Infinite Layouts, Zero Manual Work',
        paragraphs: [
          'The generator uses Binary Space Partitioning to carve a dungeon floor into non-overlapping rooms, then connects them with L-shaped corridors. A secondary wave-function collapse pass selects decorative tiles so every output looks hand-crafted.',
          'The entire pipeline runs in under 40 ms on target hardware, making mid-game regeneration feasible.',
        ],
      },
      {
        title: 'My Role & Contributions',
        paragraphs: ['This was a solo R&D project. I built:'],
        list: [
          'BSP partition algorithm with configurable min/max room size.',
          'Corridor routing system that avoids room overlap.',
          'WFC tile selector using adjacency rules defined in a ScriptableObject.',
          'Editor tooling to preview and bake seeds to JSON.',
        ],
      },
    ],
    navOrder: 5,
    featured: false,
    spotlightDirection: 'right',
    prevSlug: 'vr-escape-room',
    nextSlug: 'data-viz',
    process: [
      { phase: 'Research',   description: 'Studied BSP algorithms and wave-function collapse implementations in game contexts.' },
      { phase: 'Concept',    description: 'Designed the two-phase pipeline: BSP layout first, then WFC tile decoration.' },
      { phase: 'Prototype',  description: 'Implemented BSP partitioning and basic corridor connection in isolation.' },
      { phase: 'Production', description: 'Integrated WFC, built the modular tile set, and added the seed/serialization system.' },
      { phase: 'Polish',     description: 'Profiled and optimised to hit <40 ms, then built editor tooling for previewing results.' },
    ],
  },
  {
    slug: 'data-viz',
    title: 'Interactive Data Visualiser',
    subtitle: 'Creative Coding',
    heroImage: '/images/parking6.jpg',
    youtubeId: null,
    overview:
      'A browser-based data visualisation tool that turns raw CSV data into animated, interactive charts. Built with a focus on motion design — every transition is choreographed so the data tells a story as it changes.',
    meta: {
      role: 'Creative Developer',
      tools: 'TypeScript • D3.js • Canvas API',
      focus: 'Data Storytelling • Motion Design',
    },
    gallery: [
      { src: '/images/parking6.jpg', alt: 'Chart 1', overlay: 'Bar Chart Animation' },
      { src: '/images/parking5.jpg', alt: 'Chart 2', overlay: 'Network Graph' },
      { src: '/images/parking4.jpg', alt: 'Chart 3', overlay: 'Scatter Plot' },
      { src: '/images/parking3.jpg', alt: 'Upload UI', overlay: 'CSV Upload UI' },
      { src: '/images/parking2.jpg', alt: 'Timeline', overlay: 'Timeline View' },
      { src: '/images/parking1.jpg', alt: 'Export', overlay: 'SVG Export' },
    ],
    highlights: [
      'Drag-and-drop CSV import',
      'Animated chart transitions (D3 interpolation)',
      'Network graph with force simulation',
      'Export to SVG or PNG',
    ],
    bodySections: [
      {
        title: 'Data as Narrative',
        paragraphs: [
          'Most visualisation tools treat transitions as a technical necessity. This project treats them as a storytelling device — values morph, bars grow in sequence, nodes drift into position. The viewer experiences the data changing rather than just seeing two static states.',
          'The tool accepts any CSV and auto-detects numeric columns, making it immediately usable without configuration.',
        ],
      },
      {
        title: 'My Role & Contributions',
        paragraphs: ['I designed and built the full tool:'],
        list: [
          'D3.js chart rendering with custom easing curves.',
          'Canvas-based force simulation for network graphs.',
          'CSV parser with type inference for auto chart selection.',
          'Responsive layout that works on tablet and desktop.',
        ],
      },
    ],
    navOrder: 6,
    featured: false,
    spotlightDirection: 'left',
    prevSlug: 'procedural-dungeon',
    nextSlug: '3d-characters',
    process: [
      { phase: 'Research',   description: 'Analysed data storytelling principles and existing D3.js animation patterns.' },
      { phase: 'Concept',    description: 'Defined the chart types, transition choreography, and CSV parsing rules.' },
      { phase: 'Prototype',  description: 'Built the CSV parser and basic bar chart with animated transitions.' },
      { phase: 'Production', description: 'Added network graph, scatter plot, timeline view, and the full UI.' },
      { phase: 'Polish',     description: 'Refined animation curves, added SVG/PNG export, and tested on real datasets.' },
    ],
  },
  {
    slug: '3d-characters',
    title: '3D Character Series',
    subtitle: 'Digital Sculpting & Rigging',
    heroImage: '/images/coral-game1.jpg',
    youtubeId: null,
    overview:
      'A series of stylised 3D characters designed for real-time use in game engines. Each character was sculpted, textured in Substance Painter, and rigged with a humanoid skeleton compatible with Unity\'s Animator system.',
    meta: {
      role: '3D Artist',
      tools: 'Blender • Substance Painter • Unity',
      focus: '3D Art • Character Rigging',
    },
    gallery: [
      { src: '/images/coral-game1.jpg', alt: 'Character 1', overlay: 'Explorer Character' },
      { src: '/images/coral-game2.jpg', alt: 'Character 2', overlay: 'Scientist Character' },
      { src: '/images/coral-game3.jpg', alt: 'Textures', overlay: 'PBR Texture Work' },
      { src: '/images/coral-game4.jpg', alt: 'Rig', overlay: 'Humanoid Rig' },
      { src: '/images/coral-game5.jpg', alt: 'Animations', overlay: 'Animation Clips' },
      { src: '/images/coral-game6.jpg', alt: 'In-Engine', overlay: 'Real-time Preview' },
    ],
    highlights: [
      'Stylised low-poly aesthetic',
      'PBR textures (Substance Painter)',
      'Unity-compatible humanoid rig',
      'Idle, walk, run, interact clips',
    ],
    bodySections: [
      {
        title: 'Real-time Characters at Low Cost',
        paragraphs: [
          'The brief was to create characters that read clearly at a distance of 3–10 metres in-engine while keeping triangle counts under 8k per model. The stylised approach — slightly exaggerated proportions, flat-shaded accent areas — achieves strong readability without photorealistic detail budgets.',
          'Each character was UV-unwrapped and textured with a shared 1K atlas to minimise draw calls when multiple characters appear on screen simultaneously.',
        ],
      },
      {
        title: 'My Role & Contributions',
        paragraphs: ['Full pipeline ownership, from concept to in-engine result:'],
        list: [
          'Block-out modelling and proportion exploration in Blender.',
          'High-poly sculpt baked to game-res mesh.',
          'PBR texturing (albedo, roughness, normal, emissive) in Substance Painter.',
          'Humanoid skeleton rigging and weight painting.',
          'Animation clips authored directly in Blender and exported to Unity.',
        ],
      },
    ],
    navOrder: 7,
    featured: false,
    spotlightDirection: 'right',
    prevSlug: 'data-viz',
    nextSlug: 'rhythm-game',
    process: [
      { phase: 'Research',   description: 'Studied stylised character pipelines and real-time poly budgets for mobile targets.' },
      { phase: 'Concept',    description: 'Explored silhouettes and proportions through 2D thumbnail sketches.' },
      { phase: 'Prototype',  description: 'Modelled the first character end-to-end to validate the full pipeline before committing.' },
      { phase: 'Production', description: 'Completed remaining characters, textures, rigs, and animation sets.' },
      { phase: 'Polish',     description: 'Optimised UV atlases, cleaned rigs for Unity import, and verified in-engine visuals.' },
    ],
  },
  {
    slug: 'rhythm-game',
    title: 'Rhythm & Reaction',
    subtitle: 'Audio-Driven Game',
    heroImage: '/images/ar-game2.png',
    youtubeId: null,
    overview:
      'An audio-driven rhythm game where levels are procedurally generated from any music track the player drops in. Beat detection maps the song to gameplay events in real time, creating a unique experience with every track.',
    meta: {
      role: 'Design & Development',
      tools: 'Unity, C# • FMOD',
      focus: 'Audio Programming • Procedural Design',
    },
    gallery: [
      { src: '/images/ar-game2.png', alt: 'Gameplay', overlay: 'Live Gameplay' },
      { src: '/images/ar-game4.png', alt: 'Beat Map', overlay: 'Beat Map Visualiser' },
      { src: '/images/ar-game5.png', alt: 'Results', overlay: 'Score Screen' },
      { src: '/images/ar-game6.png', alt: 'Menu', overlay: 'Track Selection' },
      { src: '/images/ar-game1.png', alt: 'Visuals', overlay: 'Reactive Visuals' },
      { src: '/images/ar-game3.png', alt: 'Settings', overlay: 'Sensitivity Settings' },
    ],
    highlights: [
      'Real-time beat detection (any audio file)',
      'Procedurally generated note patterns',
      'FMOD for layered reactive audio',
      'Post-processing visuals tied to BPM',
    ],
    bodySections: [
      {
        title: 'Every Song Is a New Level',
        paragraphs: [
          'Traditional rhythm games require hand-authored beat maps for each track. This project removes that constraint — an FFT-based onset detection system analyses any audio file and generates a playable beat map within seconds of loading.',
          'The visual environment also reacts to the music: bloom intensity, camera shake, and particle emission rate are all driven by the real-time frequency spectrum, so fast tracks feel frantic and slow tracks feel cinematic.',
        ],
      },
      {
        title: 'My Role & Contributions',
        paragraphs: ['Sole developer. Key systems I built:'],
        list: [
          'FFT onset detection pipeline for automatic beat mapping.',
          'FMOD integration for multi-layer reactive audio.',
          'Post-processing stack (bloom, chromatic aberration) driven by audio data.',
          'Drag-and-drop audio loader accepting MP3, WAV, and OGG.',
          'Scoring, combo, and difficulty-scaling systems.',
        ],
      },
    ],
    navOrder: 8,
    featured: false,
    spotlightDirection: 'left',
    prevSlug: '3d-characters',
    nextSlug: 'ar-you-ready',
    process: [
      { phase: 'Research',   description: 'Studied FFT onset detection algorithms and existing open-source beat analysis libraries.' },
      { phase: 'Concept',    description: 'Designed the note generation rules and how frequency bands map to gameplay events.' },
      { phase: 'Prototype',  description: 'Built the beat detector and validated accuracy against a reference set of songs.' },
      { phase: 'Production', description: 'Built full game loop, FMOD audio layers, reactive visuals, and scoring system.' },
      { phase: 'Polish',     description: 'Tuned detection sensitivity, balanced difficulty scaling, and polished the UI.' },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
