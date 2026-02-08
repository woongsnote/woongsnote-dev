import { AUTHOR } from '../author';
import { siteConfig } from '../site';

export const getWebsiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
});

export const getAuthorJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: AUTHOR.name,
  url: siteConfig.url,
  knowsAbout: AUTHOR.tech,
});
