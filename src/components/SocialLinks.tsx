import Link from 'next/link';
import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import {
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
} from 'react-icons/ri';

type SocialLinkItem = {
  title: string;
  href: string;
  icon: ReactElement<IconType>;
};

const SocialLinkItems: SocialLinkItem[] = [
  {
    title: 'GitHub',
    href: 'https://github.com/woongsnote',
    icon: <RiGithubLine />,
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com/woongsnote',
    icon: <RiInstagramLine />,
  },
  {
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/woongsnote',
    icon: <RiLinkedinBoxLine />,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center w-fit gap-4">
      {SocialLinkItems.map((link) => (
        <Link
          key={link.title}
          className="p-2 text-lg border rounded-full"
          href={link.href}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
