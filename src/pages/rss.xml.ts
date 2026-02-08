import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/shared/config';
import { buildRssXml } from '@/shared/lib/feed/rss';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('posts');

  const publishedPosts = posts
    .sort(
      (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
    )
    .slice(0, 30);

  const xml = buildRssXml({
    site: site ?? siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    items: publishedPosts,
  });

  const body = new TextEncoder().encode(xml);

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
