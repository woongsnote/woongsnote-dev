import type { SiteAuthor } from './author';
import type { SiteMeta } from './meta';

export interface SiteInfo {
  title: string;
  description: string;
  baseUrl: string;
  basePath: string;
  lang: string;
  favicon: string;
  logo: string;
}

export interface SiteFeatures {
  darkMode: boolean;
}

export interface SiteTheme {
  defaultTheme: string;
}

export interface SiteConfig {
  site: SiteInfo;
  features: SiteFeatures;
  metadata: SiteMeta;
  author: SiteAuthor;
  theme: SiteTheme;
}
