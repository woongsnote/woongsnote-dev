import type { HeadProps } from '@/layouts/head';

export type PageKey = 'home' | 'about';

export const PAGE_META: Record<PageKey, HeadProps> = {
  home: {
    title: 'Woongsnote',
    description: '문지웅의 기술 블로그',
    canonicalUrl: '/',
  },
  about: {
    title: 'About',
    description: '저를 소개합니다.',
  },
} as const;
