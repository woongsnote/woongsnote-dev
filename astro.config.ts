// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';
import rehypePrettyCode from 'rehype-pretty-code';
import { unified } from '@astrojs/markdown-remark';

const prettyCodeOptions = {
  defaultLang: 'plaintext',
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  keepBackground: true,
  filterMetaString: (s: string) => s.replace(/filename="[^"]*"/, ''),
};

// https://astro.build/config
export default defineConfig({
  site: 'https://www.woongsnote.dev',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Asta Sans',
      cssVariable: '--font-asta-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['korean', 'latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  build: {
    format: 'directory',
  },
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    }),
    syntaxHighlight: false,
  },
  integrations: [sitemap()],
  output: 'static',
});
