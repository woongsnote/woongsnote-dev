import AboutIcon from '@/icons/about.svg';
import HomeIcon from '@/icons/home.svg';
import PostIcon from '@/icons/post.svg';

type IconComponent = typeof AboutIcon;

export type HeaderLinkInfo = {
  text: string;
  href: string;
  description: string;
  icon: IconComponent;
};

const normalizePath = (path: string) =>
  path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;

const HEADER_LINK_MAP: Record<string, HeaderLinkInfo> = {
  '/': {
    text: 'About',
    href: '/about',
    description: 'About 페이지로 이동',
    icon: AboutIcon,
  },
  '/about': {
    text: 'Posts',
    href: '/',
    description: '메인 페이지로 이동',
    icon: PostIcon,
  },
};

const DEFAULT_LINK: HeaderLinkInfo = {
  text: 'Home',
  href: '/',
  description: '홈으로 이동',
  icon: HomeIcon,
};

export const getHeaderLinkInfo = (pathname: string): HeaderLinkInfo => {
  const path = normalizePath(pathname);
  return HEADER_LINK_MAP[path] ?? DEFAULT_LINK;
};

export const isActiveHref = (pathname: string, href: string) => {
  const p = normalizePath(pathname);
  const h = normalizePath(href);
  return p === h;
};
