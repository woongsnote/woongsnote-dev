// @ts-check
import { readFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
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
  build: {
    format: 'directory',
  },
  trailingSlash: 'never',
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'pagefind-dev-fallback',
        apply: 'serve',
        // Build-only external rules do not apply to dev import analysis.
        resolveId(id) {
          if (id === '/pagefind/pagefind.js') return '\0pagefind-dev';
        },
        load(id) {
          if (id === '\0pagefind-dev') {
            return 'export async function search() { return { results: [] }; }';
          }
        },
      },
    ],
    build: {
      rolldownOptions: {
        // Pagefind is generated after Astro builds; load it natively at runtime.
        external: ['/pagefind/pagefind.js'],
      },
    },
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
