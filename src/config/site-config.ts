import type { NavItem, SiteConfig, Socials, MetaData } from 'src/types';

export const username = 'woongsnote';

export const SITE: SiteConfig = {
  site: {
    title: 'Woongsnote',
    base_url: 'https://www.woongsnote.dev',
    base_path: '/',
    favicon: '/favicon.svg',
    logo: '/logo.png',
    lang: 'kr',
    description: 'tech blog by woongsnote',
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
  description: '',
};

export const BLOG: MetaData = {
  title: '',
  description: '',
};

export const PROJECTS: MetaData = {
  title: '',
  description: '',
};

export const SOCIALS: Socials[] = [
  {
    name: 'github',
    url: `https://www.github.com/${username}`,
    svg: '<svg class= "w-6 h-6 cursor-pointer text-gray-400 hover:text-accent fill-current hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>GitHub</title><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>',
  },
  {
    name: 'linkedin',
    url: `https://www.linkedin.com/in/${username}`,
    svg: '<svg class= "w-6 h-6 cursor-pointer text-gray-400 hover:text-accent fill-current hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><title>Linkedin</title><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>',
  },
];
