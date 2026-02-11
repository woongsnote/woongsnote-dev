import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';
import rehypePrettyCode from 'rehype-pretty-code';
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
  vite: {
    plugins: [tailwind()],
     build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js']
      },} ,   
      optimizeDeps: {
        exclude: ['pagefind']
    }
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
  ],
  security: {
    checkOrigin: true,
  },
  adapter: vercel({
    imageService: true,
  }),
});
