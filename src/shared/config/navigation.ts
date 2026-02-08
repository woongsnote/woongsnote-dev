import type { PageKey } from './pages';

export const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    pageKey: 'home' satisfies PageKey,
  },
  {
    label: 'About',
    href: '/about',
    pageKey: 'about' satisfies PageKey,
  },
] as const;

/**
 * 단일 NavItem 타입
 * (typeof 기반 → 중복 타입 정의 제거)
 */
export type NavItem = (typeof NAV_ITEMS)[number];
