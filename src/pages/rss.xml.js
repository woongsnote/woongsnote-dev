import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE as config } from '@config/site-config';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: config.metadata.title,
    description: config.metadata.description,
    site: context.site,
    trailingSlash: false,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/${post.id}/`,
      pubDate: post.data.publishedDate,
    })),
  });
}
