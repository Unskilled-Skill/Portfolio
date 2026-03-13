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
  // ─── TEMPLATE PROJECTS (placeholders — replace with real content) ───────────
  {
    slug: 'vr-escape-room',
    title: 'Coming Soon',
    subtitle: 'Coming Soon',
    heroImage: '/images/placeholder-violet.svg',
    youtubeId: null,
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    meta: {
      role: 'Lorem Ipsum',
      tools: 'Lorem \u2022 Ipsum \u2022 Dolor',
      focus: 'Lorem \u2022 Ipsum',
    },
    gallery: [
      { src: '/images/placeholder-violet.svg', alt: 'Placeholder', overlay: 'Lorem Ipsum' },
      { src: '/images/placeholder-violet.svg', alt: 'Placeholder', overlay: 'Dolor Sit' },
      { src: '/images/placeholder-violet.svg', alt: 'Placeholder', overlay: 'Amet Consectetur' },
      { src: '/images/placeholder-violet.svg', alt: 'Placeholder', overlay: 'Adipiscing Elit' },
      { src: '/images/placeholder-violet.svg', alt: 'Placeholder', overlay: 'Sed Do Eiusmod' },
      { src: '/images/placeholder-violet.svg', alt: 'Placeholder', overlay: 'Tempor Incididunt' },
    ],
    highlights: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Sed do eiusmod tempor',
      'Ut labore et dolore magna',
    ],
    bodySections: [
      {
        title: 'Lorem Ipsum Dolor Sit Amet',
        paragraphs: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ],
      },
      {
        title: 'Consectetur Adipiscing',
        paragraphs: ['Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium:'],
        list: [
          'Lorem ipsum dolor sit amet consectetur.',
          'Adipiscing elit sed do eiusmod tempor.',
          'Incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam quis nostrud.',
        ],
      },
    ],
    navOrder: 4,
    featured: false,
    spotlightDirection: 'left',
    prevSlug: 'smart-parking',
    nextSlug: 'procedural-dungeon',
    process: [
      { phase: 'Lorem',   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.' },
      { phase: 'Ipsum',   description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
      { phase: 'Dolor',   description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
      { phase: 'Sit',     description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.' },
      { phase: 'Amet',    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
    ],
  },
  {
    slug: 'procedural-dungeon',
    title: 'Coming Soon',
    subtitle: 'Coming Soon',
    heroImage: '/images/placeholder-blue.svg',
    youtubeId: null,
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    meta: {
      role: 'Lorem Ipsum',
      tools: 'Lorem \u2022 Ipsum',
      focus: 'Lorem \u2022 Ipsum',
    },
    gallery: [
      { src: '/images/placeholder-blue.svg', alt: 'Placeholder', overlay: 'Lorem Ipsum' },
      { src: '/images/placeholder-blue.svg', alt: 'Placeholder', overlay: 'Dolor Sit' },
      { src: '/images/placeholder-blue.svg', alt: 'Placeholder', overlay: 'Amet Consectetur' },
      { src: '/images/placeholder-blue.svg', alt: 'Placeholder', overlay: 'Adipiscing Elit' },
      { src: '/images/placeholder-blue.svg', alt: 'Placeholder', overlay: 'Sed Do Eiusmod' },
      { src: '/images/placeholder-blue.svg', alt: 'Placeholder', overlay: 'Tempor Incididunt' },
    ],
    highlights: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Sed do eiusmod tempor',
      'Ut labore et dolore magna',
    ],
    bodySections: [
      {
        title: 'Lorem Ipsum Dolor Sit Amet',
        paragraphs: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ],
      },
      {
        title: 'Consectetur Adipiscing',
        paragraphs: ['Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium:'],
        list: [
          'Lorem ipsum dolor sit amet consectetur.',
          'Adipiscing elit sed do eiusmod tempor.',
          'Incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam quis nostrud.',
        ],
      },
    ],
    navOrder: 5,
    featured: false,
    spotlightDirection: 'right',
    prevSlug: 'vr-escape-room',
    nextSlug: 'data-viz',
    process: [
      { phase: 'Lorem',   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.' },
      { phase: 'Ipsum',   description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
      { phase: 'Dolor',   description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
      { phase: 'Sit',     description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.' },
      { phase: 'Amet',    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
    ],
  },
  {
    slug: 'data-viz',
    title: 'Coming Soon',
    subtitle: 'Coming Soon',
    heroImage: '/images/placeholder-teal.svg',
    youtubeId: null,
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    meta: {
      role: 'Lorem Ipsum',
      tools: 'Lorem \u2022 Ipsum \u2022 Dolor',
      focus: 'Lorem \u2022 Ipsum',
    },
    gallery: [
      { src: '/images/placeholder-teal.svg', alt: 'Placeholder', overlay: 'Lorem Ipsum' },
      { src: '/images/placeholder-teal.svg', alt: 'Placeholder', overlay: 'Dolor Sit' },
      { src: '/images/placeholder-teal.svg', alt: 'Placeholder', overlay: 'Amet Consectetur' },
      { src: '/images/placeholder-teal.svg', alt: 'Placeholder', overlay: 'Adipiscing Elit' },
      { src: '/images/placeholder-teal.svg', alt: 'Placeholder', overlay: 'Sed Do Eiusmod' },
      { src: '/images/placeholder-teal.svg', alt: 'Placeholder', overlay: 'Tempor Incididunt' },
    ],
    highlights: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Sed do eiusmod tempor',
      'Ut labore et dolore magna',
    ],
    bodySections: [
      {
        title: 'Lorem Ipsum Dolor Sit Amet',
        paragraphs: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ],
      },
      {
        title: 'Consectetur Adipiscing',
        paragraphs: ['Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium:'],
        list: [
          'Lorem ipsum dolor sit amet consectetur.',
          'Adipiscing elit sed do eiusmod tempor.',
          'Incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam quis nostrud.',
        ],
      },
    ],
    navOrder: 6,
    featured: false,
    spotlightDirection: 'left',
    prevSlug: 'procedural-dungeon',
    nextSlug: '3d-characters',
    process: [
      { phase: 'Lorem',   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.' },
      { phase: 'Ipsum',   description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
      { phase: 'Dolor',   description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
      { phase: 'Sit',     description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.' },
      { phase: 'Amet',    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
    ],
  },
  {
    slug: '3d-characters',
    title: 'Coming Soon',
    subtitle: 'Coming Soon',
    heroImage: '/images/placeholder-emerald.svg',
    youtubeId: null,
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    meta: {
      role: 'Lorem Ipsum',
      tools: 'Lorem \u2022 Ipsum \u2022 Dolor',
      focus: 'Lorem \u2022 Ipsum',
    },
    gallery: [
      { src: '/images/placeholder-emerald.svg', alt: 'Placeholder', overlay: 'Lorem Ipsum' },
      { src: '/images/placeholder-emerald.svg', alt: 'Placeholder', overlay: 'Dolor Sit' },
      { src: '/images/placeholder-emerald.svg', alt: 'Placeholder', overlay: 'Amet Consectetur' },
      { src: '/images/placeholder-emerald.svg', alt: 'Placeholder', overlay: 'Adipiscing Elit' },
      { src: '/images/placeholder-emerald.svg', alt: 'Placeholder', overlay: 'Sed Do Eiusmod' },
      { src: '/images/placeholder-emerald.svg', alt: 'Placeholder', overlay: 'Tempor Incididunt' },
    ],
    highlights: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Sed do eiusmod tempor',
      'Ut labore et dolore magna',
    ],
    bodySections: [
      {
        title: 'Lorem Ipsum Dolor Sit Amet',
        paragraphs: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ],
      },
      {
        title: 'Consectetur Adipiscing',
        paragraphs: ['Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium:'],
        list: [
          'Lorem ipsum dolor sit amet consectetur.',
          'Adipiscing elit sed do eiusmod tempor.',
          'Incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam quis nostrud.',
        ],
      },
    ],
    navOrder: 7,
    featured: false,
    spotlightDirection: 'right',
    prevSlug: 'data-viz',
    nextSlug: 'rhythm-game',
    process: [
      { phase: 'Lorem',   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.' },
      { phase: 'Ipsum',   description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
      { phase: 'Dolor',   description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
      { phase: 'Sit',     description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.' },
      { phase: 'Amet',    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
    ],
  },
  {
    slug: 'rhythm-game',
    title: 'Coming Soon',
    subtitle: 'Coming Soon',
    heroImage: '/images/placeholder-amber.svg',
    youtubeId: null,
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    meta: {
      role: 'Lorem Ipsum',
      tools: 'Lorem \u2022 Ipsum \u2022 Dolor',
      focus: 'Lorem \u2022 Ipsum',
    },
    gallery: [
      { src: '/images/placeholder-amber.svg', alt: 'Placeholder', overlay: 'Lorem Ipsum' },
      { src: '/images/placeholder-amber.svg', alt: 'Placeholder', overlay: 'Dolor Sit' },
      { src: '/images/placeholder-amber.svg', alt: 'Placeholder', overlay: 'Amet Consectetur' },
      { src: '/images/placeholder-amber.svg', alt: 'Placeholder', overlay: 'Adipiscing Elit' },
      { src: '/images/placeholder-amber.svg', alt: 'Placeholder', overlay: 'Sed Do Eiusmod' },
      { src: '/images/placeholder-amber.svg', alt: 'Placeholder', overlay: 'Tempor Incididunt' },
    ],
    highlights: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Sed do eiusmod tempor',
      'Ut labore et dolore magna',
    ],
    bodySections: [
      {
        title: 'Lorem Ipsum Dolor Sit Amet',
        paragraphs: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ],
      },
      {
        title: 'Consectetur Adipiscing',
        paragraphs: ['Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium:'],
        list: [
          'Lorem ipsum dolor sit amet consectetur.',
          'Adipiscing elit sed do eiusmod tempor.',
          'Incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam quis nostrud.',
        ],
      },
    ],
    navOrder: 8,
    featured: false,
    spotlightDirection: 'left',
    prevSlug: '3d-characters',
    nextSlug: 'ar-you-ready',
    process: [
      { phase: 'Lorem',   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.' },
      { phase: 'Ipsum',   description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
      { phase: 'Dolor',   description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
      { phase: 'Sit',     description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.' },
      { phase: 'Amet',    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
