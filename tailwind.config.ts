import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1c1d26',
        surface: '#272833',
        accent: '#e44c65',
        'accent-dark': '#c73d56',
        muted: 'rgba(255,255,255,0.55)',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
      },
    },
  },
  plugins: [],
};

export default config;
