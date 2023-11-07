/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bkg: 'hsl(var(--color-bkg) / <alpha-value>)',
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
        content: 'hsl(var(--color-content) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
