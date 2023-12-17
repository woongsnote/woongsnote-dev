import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  site: 'https://woongsnote.dev',
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    tailwind(),
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'one-dark-pro',
          },
        ],
      ],
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    react(),
  ],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    imageService: true,
  }),
});
