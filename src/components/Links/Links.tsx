import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import { RiArticleLine, RiUser3Line, RiHome2Line } from 'react-icons/ri';

type LinkItem = {
  label: string;
  bottomLabel: string;
  href: string;
  icon: ReactElement<IconType>;
};

export const Links: LinkItem[] = [
  {
    label: 'Home',
    bottomLabel: 'Home',
    href: '/',
    icon: <RiHome2Line />,
  },
  {
    label: 'About',
    bottomLabel: 'About',
    href: '/about',
    icon: <RiUser3Line />,
  },
  {
    label: 'Posts',
    bottomLabel: 'Posts',
    href: '/posts',
    icon: <RiArticleLine />,
  },
];
