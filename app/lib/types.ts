import { IconType } from 'react-icons';

export type NavLink = {
  title: string;
  href: string;
};

export type SocialLink = {
  title: string;
  href: string;
  icon: React.ReactElement<IconType>;
};

export type PageProps = {
  params: { slug: string };
};

export type PostHeaderProps = {
  title: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
};

export type PostThumbnailProps = {
  title: string;
  thumbnail: string;
};
