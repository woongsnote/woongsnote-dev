import { IconType } from 'react-icons';
import { AiFillHome, AiFillEdit, AiFillDatabase } from 'react-icons/ai';

interface LinkItem {
  label: string;
  bottomLabel: string;
  href: string;
  icon: React.ReactElement<IconType>;
}

export const Links: LinkItem[] = [
  {
    label: '',
    bottomLabel: 'Home',
    href: '/',
    icon: <AiFillHome/> ,
  },
  {
    label: 'Blog',
    bottomLabel: 'Blog',
    href: '/blog',
    icon: <AiFillEdit/>,
  },
  {
    label: 'Projects',
    bottomLabel: 'Projects',
    href: '/projects',
    icon: <AiFillDatabase/>,
  },
];
