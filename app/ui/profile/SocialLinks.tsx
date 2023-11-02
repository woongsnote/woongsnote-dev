import { SocialLink } from '@/app/lib/types';
import {
  RiArrowRightUpLine,
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
      className="p-2 text-lg lg:text-xl flex gap-1 items-center text-start w-40 hover:underline hover:underline-offset-8 hover:text-primary"
      aria-label={`move to ${title}`}
      target="_blank"
    >
      <span className="p-2">{icon}</span>
      <span>{title}</span>
    </a>
  );
};

export const SocialLinks = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-center w-fit gap-4">
      {SocialLinkItems.map((link) => (
        <ExtLink key={link.title} {...link} />
      ))}
    </div>
  );
};
