import { IconType } from 'react-icons';
import { AiFillHome, AiFillEdit, AiFillDatabase } from 'react-icons/ai';

type TLinkItem = {
  label: string;
  bottomLabel: string;
  href: string;
  icon: React.ReactElement<IconType>;
};

export const Links: TLinkItem[] = [
  {
    label: '',
    bottomLabel: 'Home',
    href: '/',
    icon: <AiFillHome />,
  },
  {
    label: 'Blog',
    bottomLabel: 'Blog',
    href: '/blog',
    icon: <AiFillEdit />,
  },
  {
    label: 'Projects',
    bottomLabel: 'Projects',
    href: '/projects',
    icon: <AiFillDatabase />,
  },
];
