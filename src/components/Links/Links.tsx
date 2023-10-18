import { IconType } from 'react-icons';
import { AiFillHome, AiFillEdit, AiFillDatabase } from 'react-icons/ai';

type LinkItem = {
  label: string;
  bottomLabel: string;
  href: string;
  icon: React.ReactElement<IconType>;
};

export const Links: LinkItem[] = [
  {
    label: 'Home',
    bottomLabel: 'Home',
    href: '/',
    icon: <AiFillHome />,
  },
  {
    label: 'About',
    bottomLabel: 'About',
    href: '/about',
    icon: <AiFillEdit />,
  },
  {
    label: 'Posts',
    bottomLabel: 'Posts',
    href: '/posts',
    icon: <AiFillEdit />,
  },
];
