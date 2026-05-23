// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';
import rehypePrettyCode from 'rehype-pretty-code';

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
  integrations: [
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      optimize: true,
    }),
    sitemap(),
  ],
  output: 'static',
});
