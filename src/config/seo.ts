import { OG } from '@/lib/og';

import { AUTHOR, siteConfig } from './site';

export const getWebsiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.lang,
  image: `${siteConfig.url}${siteConfig.defaultOgImage}`,
});

type ArticleJsonLdParams = {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
};

export const getArticleJsonLd = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: ArticleJsonLdParams) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  url,
  inLanguage: siteConfig.lang,
  image: {
    '@type': 'ImageObject',
    url: image,
    width: OG.width,
    height: OG.height,
  },
  datePublished,
  dateModified: dateModified ?? datePublished,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url,
  },
  author: {
    '@type': 'Person',
    name: AUTHOR.name,
    alternateName: AUTHOR.nameEn,
    url: `${siteConfig.url}/about`,
  },
  publisher: {
    '@type': 'Person',
    name: AUTHOR.name,
    alternateName: AUTHOR.nameEn,
    url: siteConfig.url,
  },
});
