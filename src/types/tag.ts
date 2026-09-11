export const TAG_TYPES = [
  'Astro',
  'Next.js',
  'React',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'CSS',
  'HTML',
  'Vite',
  'Vercel',
  'Git',
  'SEO',
  'MDX',
  'shadcn/ui',
  'Notion',
  'UI',
  'Frontend',
  'Blog',
  'Apple',
  'Mac',
] as const;

export type TagType = (typeof TAG_TYPES)[number];

export const TAG_SLUGS = {
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
} as const satisfies Record<TagType, string>;

export type TagSlug = (typeof TAG_SLUGS)[TagType];

export const TAGS_BY_SLUG = Object.fromEntries(
  TAG_TYPES.map((tag) => [TAG_SLUGS[tag], tag])
) as Record<TagSlug, TagType>;
