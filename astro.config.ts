// @ts-check
import { readFile } from 'node:fs/promises';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { type SitemapItem } from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import { unified } from '@astrojs/markdown-remark';

const outputDirectory = new URL('./dist/', import.meta.url);

const serializeSitemapItem = async (item: SitemapItem) => {
  const { pathname } = new URL(item.url);

  if (!pathname.startsWith('/tags/')) return item;

  const page = await readFile(
    new URL(`.${pathname}/index.html`, outputDirectory),
    'utf8'
  );

  return page.includes('<meta name="robots" content="noindex,follow">')
    ? undefined
    : item;
};

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
      weights: [400, 600],
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
      remarkPlugins: [],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    }),
    syntaxHighlight: false,
  },
  integrations: [sitemap({ serialize: serializeSitemapItem })],
  output: 'static',
});
