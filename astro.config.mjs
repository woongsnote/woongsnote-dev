import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://woongsnote.dev',
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  integrations: [tailwind(), mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  }), sitemap(), react()],
  output: 'server',
  adapter: vercel()
});