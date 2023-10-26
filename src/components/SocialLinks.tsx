import { SocialLink } from '@/types';
import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import {
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
} from 'react-icons/ri';

type SocialLinkItem = SocialLink & {
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

const ExtLink = (props: SocialLinkItem) => {
  const { title, href, icon } = props;
  return (
    <a
      href={href}
      className="p-2 text-lg border rounded-full"
      aria-label={`move to ${title}`}
      target="_blank"
    >
      {icon}
    </a>
  );
};

const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center w-fit gap-4">
      {SocialLinkItems.map((link) => (
        <ExtLink key={link.title} {...link} />
      ))}
    </div>
  );
};

export default SocialLinks;
