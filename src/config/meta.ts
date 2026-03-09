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
