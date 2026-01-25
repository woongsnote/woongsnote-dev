export const PAGE_META = {
  home: {
    title: 'Home',
    description: '문지웅의 기술 블로그',
  },

  about: {
    title: 'About',
    description: '저를 소개합니다.',
  },
} as const;

/**
 * PAGE_META의 key 타입
 * - navigation
 * - layout
 * - SEO
 * 에서 공통으로 사용
 */
export type PageKey = keyof typeof PAGE_META;
