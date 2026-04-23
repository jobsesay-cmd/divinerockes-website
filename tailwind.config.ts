import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f8ff',
          500: '#0a5eb8',
          700: '#084383',
          900: '#042746',
        },
      },
    },
  },
  plugins: [],
};

export default config;
