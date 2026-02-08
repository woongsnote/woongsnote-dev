// src/shared/types/site/meta.ts
export type HeadMetaInput = {
  title: string;
  description: string;
  canonicalPath: string; // "/about" 같은 path
  ogImage?: string; // "/og.png" 같은 path 또는 absolute
  robots?: string;
};

export type HeadMeta = {
  title: string;
  description: string;
  canonicalUrl: string; // absolute
  ogImageUrl: string; // absolute
  robots?: string;
};
