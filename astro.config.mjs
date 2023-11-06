import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  mdx: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
  integrations: [tailwind(), mdx()],
  output: 'server',
  adapter: vercel(),
});
