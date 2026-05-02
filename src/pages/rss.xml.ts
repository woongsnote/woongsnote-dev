import type { APIRoute } from 'astro';
import { AUTHOR, siteConfig } from '@/config';
import { getPosts } from '@/lib/posts';
import { buildRssXml } from '@/lib/rss';

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL(siteConfig.url)).href.replace(/\/+$/, '');

  const xml = buildRssXml({
    site: base,
    feedUrl: `${base}/rss.xml`,
    title: siteConfig.name,
    description: siteConfig.description,
    language: siteConfig.lang,
    author: AUTHOR.name,
    items: await getPosts(),
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
