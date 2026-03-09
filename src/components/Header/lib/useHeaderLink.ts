import AboutIcon from '@/shared/assets/icons/about.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';

const normalizePath = (path: string) =>
  path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;

export const getHeaderLink = (pathname: string) => {
  const isHome = normalizePath(pathname) === '/';
  return isHome
    ? { href: '/about', text: 'About', icon: AboutIcon }
    : { href: '/', text: 'Home', icon: HomeIcon };
};

export const isActiveHref = (pathname: string, href: string) => {
  const p = normalizePath(pathname);
  const h = normalizePath(href);
  return p === h;
};
