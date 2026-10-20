// @ts-check
import { readFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { type SitemapItem } from '@astrojs/sitemap';
import type { ShikiConfig } from 'astro';
import { transformerMetaHighlight } from '@shikijs/transformers';

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

const shikiOptions = {
  themes: {
    light: 'github-light',
    dark: 'github-dark-dimmed',
  },
  defaultColor: false,
  transformers: [
    transformerMetaHighlight(),
    {
      name: 'woongsnote-code-title',

      pre(node) {
        node.properties.tabIndex = 0;
      },

      root(root) {
        const meta = this.options.meta?.__raw ?? '';
        const title = meta.match(/\btitle="([^"]+)"/)?.[1];

        if (!title) return;

        const pre = root.children[0];

        if (pre?.type !== 'element' || pre.tagName !== 'pre') {
          return;
        }

        root.children = [
          {
            type: 'element',
            tagName: 'figure',
            properties: {
              className: ['code-figure'],
            },
            children: [
              {
                type: 'element',
                tagName: 'figcaption',
                properties: {
                  className: ['code-title'],
                },
                children: [{ type: 'text', value: title }],
              },
              pre,
            ],
          },
        ];
      },
    },
  ],
} satisfies ShikiConfig;

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
    shikiConfig: shikiOptions,
  },
  integrations: [sitemap({ serialize: serializeSitemapItem })],
  output: 'static',
});
