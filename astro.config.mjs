import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import rehypePrettyCode from 'rehype-pretty-code';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

export default defineConfig({
  site: 'https://woongsnote.dev',
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        page: 'storyblok/Page',
        feature: 'storyblok/Feature',
        teaser: 'storyblok/Teaser',
        grid: 'storyblok/Grid',
        section: 'storyblok/Section',
        'latest-articles': 'storyblok/LatestArticles',
        'all-articles': 'storyblok/AllArticles',
        article: 'storyblok/Article',
        hero: 'storyblok/Hero',
      },
      apiOptions: {
        region: 'us',
      },
    }),
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
  vite: {
    plugins: [mkcert()],
    server: {
      https: true,
    },
  },
});
