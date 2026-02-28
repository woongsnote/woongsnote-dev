export const siteConfig = {
  url: 'https://www.woongsnote.dev',
  lang: 'ko',
  locale: 'ko-KR',
  name: 'woongsnote',
  description:
    '개발 관련 학습한 지식과 구현한 프로젝트들을 기록하기 위한 공간입니다.',
  author: '문지웅',
  defaultOgImage: '/opengraph-image.png',
} as const;



export type SiteConfig = typeof siteConfig;

