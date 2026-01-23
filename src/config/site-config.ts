import type { NavItem, SiteConfig, SocialLink, PageMeta } from '@utils/types';
import DiaryIcon from '@icons/diary.svg';
import ProjectIcon from '@icons/project.svg';
import TechIcon from '@icons/tech.svg';
import type { Category, CategoryType } from '@utils/types';

export const username = 'woongsnote';
export const BASE_URL = 'https://www.woongsnote.dev';

export const SITE_DESCRIPTION =
  '개발 관련 학습한 지식과 구현한 프로젝트들을 기록하기 위한 공간입니다.';

export const SITE: SiteConfig = {
  site: {
    title: 'woongsnote',
    baseUrl: BASE_URL,
    basePath: '/',
    favicon: '/favicon.svg',
    logo: '/logo.png',
    lang: 'ko',
    description: `Woong's technical blog`,
  },
  features: {
    darkMode: true,
  },
  metadata: {
    author: `${username}`,
    title: BASE_URL,
    description: SITE_DESCRIPTION,
  },
  author: {
    name: `@${username}`,
    bio: `안녕하세요. 문지웅입니다. 학습한 새로운 기술과 지식으로 아이디어를 시각적으로 구현하는 것을 좋아합니다.`,
    tech: 'Astro, React, Next.js, TypeScript',
  },
  theme: {
    defaultTheme: 'light',
  },
};

export const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    metaKey: 'home',
  },
  {
    label: 'About',
    href: '/about',
    metaKey: 'about',
  },
] as const;

export type PageKey = 'home' | 'about';

export const PAGE_META = {
  home: {
    title: 'Home',
    description: SITE_DESCRIPTION,
  },
  about: {
    title: 'About Me',
    description: '저를 소개합니다.',
  },
} satisfies Record<PageKey, PageMeta>;

export const SOCIALS: SocialLink[] = [
  {
    type: 'github',
    url: `https://www.github.com/${username}`,
  },
  {
    type: 'linkedin',
    url: `https://www.linkedin.com/in/${username}`,
  },
  {
    type: 'email',
    url: 'mailto:woongsnote@gmail.com',
  },
  {
    type: 'rss',
    url: '/rss.xml',
  },
];

export const CATEGORIES = {
  Diary: {
    type: 'Diary',
    label: 'Diary',
    icon: DiaryIcon,
  },
  Tech: {
    type: 'Tech',
    label: 'Tech',
    icon: TechIcon,
  },
  Project: {
    type: 'Project',
    label: 'Project',
    icon: ProjectIcon,
  },
} as const satisfies Record<CategoryType, Category>;
