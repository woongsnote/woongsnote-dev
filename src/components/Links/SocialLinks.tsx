import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';

type SocialLinkItem = {
  title: string;
  href: string;
  icon: React.ReactElement<IconType>;
};

const SocialLinkItems: SocialLinkItem[] = [
  {
    title: 'GitHub',
    href: 'https://github.com/woongsnote',
    icon: <BsGithub />,
  },
  {
    title: 'Instagram',
    href: 'https://github.com/woongsnote',
    icon: <BsInstagram />,
  },
  {
    title: 'LinkedIn',
    href: 'https://github.com/woongsnote',
    icon: <BsLinkedin />,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-row gap-2">
      {SocialLinkItems.map((link) => (
        <Link
          key={link.title}
          className="p-2 text-lg border rounded-full text-gray-500"
          href={link.href}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
