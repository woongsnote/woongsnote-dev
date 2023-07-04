import { AiFillHome, AiFillEdit, AiFillDatabase } from 'react-icons/ai';

interface myLink {
  label: string;
  bottomLabel: string;
  href: string;
  icon: JSX.Element;
}

export const Links: myLink[] = [
  { label: '', bottomLabel: 'Home', href: '/', icon: <AiFillHome /> },
  { label: 'Blog', bottomLabel: 'Blog', href: '/blog', icon: <AiFillEdit /> },
  {
    label: 'Projects',
    bottomLabel: 'Projects',
    href: '/projects',
    icon: <AiFillDatabase />,
  },
];
