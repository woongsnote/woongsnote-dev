export type HeaderLinkInfo = {
  text: string;
  href: string;
  description: string;
};

const normalizePath = (path: string) =>
  path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;

const HEADER_LINK_MAP: Record<string, HeaderLinkInfo> = {
  '/': {
    text: 'About',
    href: '/about',
    description: 'About 페이지로 이동',
  },
  '/about': {
    text: 'Posts',
    href: '/',
    description: '메인 페이지로 이동',
  },
};

export const getHeaderLinkInfo = (pathname: string): HeaderLinkInfo => {
  const path = normalizePath(pathname);
  return (
    HEADER_LINK_MAP[path] ?? {
      text: 'Home',
      href: '/',
      description: '홈으로 이동',
    }
  );
};
