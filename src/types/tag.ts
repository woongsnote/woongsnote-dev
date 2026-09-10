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
