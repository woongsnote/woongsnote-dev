export const PAGES = {
  home: { path: '/', label: 'Home' },
  about: { path: '/about', label: 'About' },
  notFound: { path: '/404', label: '404' },
} as const;

export type PageKey = keyof typeof PAGES;
