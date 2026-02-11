// export const SITE_META = {
//   title: 'Woongsnote',
//   description:
//     '개발 관련 학습한 지식과 구현한 프로젝트들을 기록하기 위한 공간입니다.',

//   // OG / Twitter 기본 이미지
//   defaultImage: '/opengraph-image.png',
// } as const;

// import { SITE } from './site';

// export type PageType = 'home' | 'about' | 'post' | '404';

// export const DEFAULT_OG = {
//   image: `${SITE.baseUrl}/og.png`,
//   twitterCard: 'summary_large_image' as const,
// };

// export function formatTitle(input: { pageTitle?: string }) {
//   const { pageTitle } = input;

//   return pageTitle ? `${pageTitle} | ${SITE.title}` : SITE.title;
// }

import type { PageKey } from './pages';

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
