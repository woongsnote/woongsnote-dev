import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vercel from '@astrojs/vercel/static';
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
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
