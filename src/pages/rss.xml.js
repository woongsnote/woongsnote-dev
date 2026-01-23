import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE as config } from '@config/site-config';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: config.metadata.title,
    description: config.metadata.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      pubDate: post.data.publishedDate,
    })),
  });
}
