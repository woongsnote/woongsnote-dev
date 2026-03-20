// src/config/site.ts
// ─── 사이트 전체 설정을 한 곳에서 관리 ───
// ── Site ──
export const siteConfig = {
  url: 'https://www.woongsnote.dev',
  lang: 'ko',
  locale: 'ko-KR',
  name: 'woongsnote',
  description:
    '개발 관련 학습한 지식과 구현한 프로젝트들을 기록하기 위한 공간입니다.',
  defaultOgImage: '/opengraph-image.png',
} as const;

export type SiteConfig = typeof siteConfig;

// ── Author ──
export const AUTHOR = {
  name: '문지웅',
  nameEn: 'Jiwoong Moon',
  nickname: 'woongsnote',
  bio: '학습한 새로운 기술과 지식으로 아이디어를 시각적으로 구현하는 것을 좋아합니다.',
  tech: ['Astro', 'React', 'Next.js', 'TypeScript'],
} as const;

export type Author = typeof AUTHOR;

// ── Socials ──
export const SOCIALS = [
  { type: 'github', url: 'https://www.github.com/woongsnote', title: 'GitHub' },
  {
    type: 'linkedin',
    url: 'https://www.linkedin.com/in/woongsnote',
    title: 'LinkedIn',
  },
  { type: 'rss', url: '/rss.xml', title: 'RSS' },
] as const;

export type SocialType = (typeof SOCIALS)[number]['type'];

// ── Theme ──
export const THEME = {
  light: 'woong-light',
  dark: 'woong-dark',
  storageKey: 'theme',
} as const;

// ── Giscus (댓글) ──
export const GISCUS = {
  repo: 'woongsnote/woongsnote-dev',
  repoId: 'R_kgDOIZVQXA',
  category: 'Comments',
  categoryId: 'DIC_kwDOIZVQXM4Caihi',
  mapping: 'url',
  theme: 'dark_tritanopia',
  lang: 'en',
} as const;

// ── OG Image ──
export const OG_IMAGE = {
  width: 1200,
  height: 630,
  bgColor: '#0074FF',
  label: 'Blog',
} as const;

// ── 수량 제한 ──
export const LIMITS = {
  homePostCount: 10,
  rssItemCount: 30,
} as const;

// ── TOC ──
export const TOC = {
  minDepth: 2,
  maxDepth: 3,
} as const;
