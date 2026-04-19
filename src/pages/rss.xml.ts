import type { APIRoute } from 'astro';
import { siteConfig } from '@/config';
import { buildRssXml } from '@/lib/rss';
import { getPosts } from '@/lib/posts';

export const GET: APIRoute = async ({ site }) => {
  const publishedPosts = await getPosts();

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
