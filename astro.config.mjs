import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './remark-reading-time.mjs';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

const prettyCodeOptions = {
  defaultLang: 'plaintext',
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  keepBackground: true,
  filterMetaString: (string) => string.replace(/filename="[^"]*"/, ''),
};

// https://astro.build/config
export default defineConfig({
  site: 'https://www.woongsnote.dev',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [tailwind()],
  },
  integrations: [
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      optimize: true,
    }),
    sitemap({
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date(),
    }),
    icon(),
  ],
  adapter: vercel(),
  security: {
    checkOrigin: true,
  },
});
