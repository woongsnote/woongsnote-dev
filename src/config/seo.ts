import { SITE, SITE_META, AUTHOR } from './index';

export const getWebsiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_META.title,
  url: SITE.baseUrl,
  description: SITE_META.description,
});

export const getAuthorJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: AUTHOR.name,
  url: SITE.baseUrl,
  knowsAbout: AUTHOR.tech,
});
