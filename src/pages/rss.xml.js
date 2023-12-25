import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from 'consts';

/**
 * Retrieves a collection of blog posts and generates an RSS feed.
 *
 * @param {object} context - The context object containing site information.
 * @return {Promise} A promise that resolves to the generated RSS feed.
 */
export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
