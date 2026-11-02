export const TAGS = {
  Astro: 'astro',
  'Next.js': 'nextjs',
  React: 'react',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  'Tailwind CSS': 'tailwind-css',
  CSS: 'css',
  HTML: 'html',
  Vite: 'vite',
  Vercel: 'vercel',
  Git: 'git',
  SEO: 'seo',
  MDX: 'mdx',
  'shadcn/ui': 'shadcn-ui',
  Notion: 'notion',
  UI: 'ui',
  Frontend: 'frontend',
  Blog: 'blog',
  Apple: 'apple',
  Mac: 'mac',
  'Node.js': 'nodejs',
  Tooling: 'tooling',
} as const;

export type TagType = keyof typeof TAGS;

export const TAG_TYPES = Object.keys(TAGS) as [TagType, ...TagType[]];

export const TAG_SLUGS = TAGS;

export type TagSlug = (typeof TAG_SLUGS)[TagType];

export const TAGS_BY_SLUG = Object.fromEntries(
  Object.entries(TAGS).map(([name, slug]) => [slug, name])
) as Record<TagSlug, TagType>;
