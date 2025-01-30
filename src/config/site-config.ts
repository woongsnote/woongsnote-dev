import type { NavItem, SiteConfig, Links, MetaData } from '@utils/types';

export const username = 'woongsnote';

export const SITE: SiteConfig = {
  site: {
    title: "woongsnote",
    base_url: 'https://www.woongsnote.dev',
    base_path: '/',
    favicon: '/favicon.svg',
    logo: '/logo.png',
    lang: 'ko',
    description: `Woong's technical blog`,
  },
  features: {
    dark_mode: true,
  },
  metadata: {
    meta_author: `${username}`,
    meta_title: 'www.woongsnote.dev',
    meta_description:
      '개발 관련 학습한 지식과 구현한 프로젝트들을 기록하기 위한 공간입니다.',
  },
  author: {
    name: `@${username}`,
    bio: `안녕하세요. 문지웅입니다. 학습한 새로운 기술과 지식으로 아이디어를 시각적으로 구현하는 것을 좋아합니다.`,
    tech: 'React, Next.js, TypeScript',
  },
  theme: {
    defaultTheme: 'light',
  },
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'About',
    href: '/about',
  },
];

export const HOME: MetaData = {
  title: 'Home',
  description: `Woong's technology blog with latest archived articles and projects.`,
};

export const BLOG: MetaData = {
  title: 'Blog',
  description: 'A collection of knowledge and projects related to development',
};

export const ABOUT: MetaData = {
  title: 'About Me',
  description: `This is Woong's self-introduction page.`,
};

export const SOCIALS: Links[] = [
  {
    name: 'github',
    url: `https://www.github.com/${username}`,
  },
  {
    name: 'linkedin',
    url: `https://www.linkedin.com/in/${username}`,
  },
  {
    name: 'email',
    url: 'mailto:woongsnote@gmail.com',
  },
  {
    name: 'rss',
    url: '/rss.xml',
  },
];

export const CATEGORIES = [
  {
    title: 'All',
    page: 'all',
    href: '/blog',
  },
  {
    title: 'Tech',
    page: 'tech',
    href: '/blog/tech',
  },
  {
    title: 'Diary',
    page: 'diary',
    href: '/blog/diary',
  },
  {
    title: 'Project',
    page: 'project',
    href: '/blog/project',
  },
];
