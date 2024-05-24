import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  theme: {
    dark: 'one-dark-pro',
    light: 'github-light',
  },
};

export default defineConfig({
  site: 'https://www.woongsnote.dev',
  integrations: [
    tailwind(),
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    }),
    sitemap({
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date(),
    }),
  ],
  output: 'server',
  adapter: vercel({
    isr: true,
    webAnalytics: {
      enabled: true,
    },
  }),
  security: {
    checkOrigin: true,
  },
});
