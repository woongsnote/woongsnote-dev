// src/config/pages.ts
// ─── 페이지 정의 · 네비게이션 · 메타 오버라이드 ───

// ── Pages ──
export const PAGES = {
  home: { path: '/', label: 'Home' },
  about: { path: '/about', label: 'About' },
  archive: { path: '/archive', label: 'Archive' },
  notFound: { path: '/404', label: '404' },
} as const;

export type PageKey = keyof typeof PAGES;

// ── Navigation ──
export const NAV_ITEMS = [
  { label: 'Home', href: '/', pageKey: 'home' satisfies PageKey },
  { label: 'About', href: '/about', pageKey: 'about' satisfies PageKey },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

// ── Page Meta Overrides ──
export type PageMetaOverride = Partial<{
  title: string;
  description: string;
  ogImage: string;
  robots: string;
}>;

export const PAGE_META_OVERRIDES: Record<PageKey, PageMetaOverride> = {
  home: {},
  about: { description: '소개 페이지' },
  notFound: {
    robots: 'noindex, nofollow',
    description: '페이지를 찾을 수 없습니다.',
  },
  archive: { title: 'Archive', description: '전체 글 모음' },
} as const satisfies Record<PageKey, PageMetaOverride>;
