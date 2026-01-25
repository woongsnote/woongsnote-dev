import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, SITE_META } from '@config';
import { buildRssXml } from '@utils/rss';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');

  const publishedPosts = posts
    .sort(
      (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
    )
    .slice(0, 30);

  const xml = buildRssXml({
    site: site ?? SITE.baseUrl,
    title: SITE_META.title,
    description: SITE_META.description,
    items: publishedPosts,
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
