import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import config from '@config/site-config';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: config.metadata.meta_title,
    description: config.metadata.meta_description,
    site: context.site,
    items: blog.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
      pubDate: post.data.publishedDate,
    })),
  });
}
