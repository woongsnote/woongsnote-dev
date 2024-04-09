/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'hsl(var(--color-background) / <alpha-value>)',
        content: 'hsl(var(--color-content) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        subContent: 'hsl(var(--color-sub-content) / <alpha-value>)',
        white: 'hsl(var(--color-white) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['PretendardVariable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
