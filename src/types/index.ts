export type TPost = {
  id: string;
  thumbnail?: string;
  category: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export type SocialLink = {
  title: string;
  href: string;
};
