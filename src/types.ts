export type MetaData = {
  title: string;
  description: string;
};

export type SiteConfig = {
  site: {
    title: string;
    base_url: string;
    base_path: string;
    favicon: string;
    logo: string;
    lang: string;
    description: string;
  };
  features: {
    dark_mode: boolean;
  };
  metadata: {
    meta_author: string;
    meta_title: string;
    meta_description: string;
  };
  author: {
    name: string;
    bio: string;
    tech: string;
  };
  theme: {
    defaultTheme: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
};

export type Links = {
  name: string;
  url: string;
  svg: string;
};
