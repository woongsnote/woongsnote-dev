import { SocialLink } from '@/app/lib/types';
import {
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
} from 'react-icons/ri';

const SocialLinkItems: SocialLink[] = [
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

const ExtLink = (props: SocialLink) => {
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

export const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center w-fit gap-4">
      {SocialLinkItems.map((link) => (
        <ExtLink key={link.title} {...link} />
      ))}
    </div>
  );
};
