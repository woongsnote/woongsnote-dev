// src/config/seo.ts
import { AUTHOR, siteConfig } from './site';

export const getWebsiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
});

type ArticleJsonLdParams = {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
};

export const getArticleJsonLd = ({
  title,
  description,
  url,
  image,
  datePublished,
}: ArticleJsonLdParams) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  url,
  image,
  datePublished,
  author: {
    '@type': 'Person',
    name: AUTHOR.name,
    url: siteConfig.url,
  },
  publisher: {
    '@type': 'Person',
    name: AUTHOR.name,
  },
});
