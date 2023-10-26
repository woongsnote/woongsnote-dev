import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0496ff',
        secondary: '#6366f1',
        darkBlack: '#121212',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), 'prettier-plugin-tailwindcss'],
};
export default config;
