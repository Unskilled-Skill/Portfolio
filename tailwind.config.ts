import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Redesign tokens (preferred)
        rf: {
          bg: '#131419',
          surface: '#15161d',
          surface2: '#1a1b23',
          ink: '#f3f2ef',
          accent: '#e44c65',
          accentHover: '#ff5f78',
        },
        // Legacy aliases — kept pointing at the new palette so any
        // not-yet-restyled view still compiles. Removed at cleanup.
        bg: '#131419',
        surface: '#15161d',
        accent: '#e44c65',
        'accent-dark': '#c73d56',
        muted: 'rgba(243,242,239,0.55)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontWeight: {
        thin: '300',
        light: '300',
        normal: '400',
      },
      maxWidth: { shell: '1320px' },
      letterSpacing: { label: '0.14em', tight2: '-0.035em' },
      transitionTimingFunction: { rf: 'cubic-bezier(0.2,0.7,0.2,1)' },
      keyframes: {
        'rf-marquee': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { 'rf-marquee': 'rf-marquee 32s linear infinite' },
    },
  },
  plugins: [],
};

export default config;
