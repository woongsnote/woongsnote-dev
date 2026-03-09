//src/shared/config/pages.ts
export const PAGES = {
  home: { path: '/', label: 'Home' },
  about: { path: '/about', label: 'About' },
  archive: { path: '/archive', label: 'Archive' },
  notFound: { path: '/404', label: '404' },
} as const;

export type PageKey = keyof typeof PAGES;
