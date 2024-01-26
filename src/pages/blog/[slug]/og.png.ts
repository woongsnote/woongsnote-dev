import { getCollection, type CollectionEntry } from 'astro:content';
import { ImageResponse } from '@vercel/og';

export const prerender = true;

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<'blog'> };
}

export async function GET({ props }: Props) {
  const { post } = props;

  // Astro doesn't support tsx endpoints so using React-element objects
  const html = {
    type: 'div',
    key: 'ogImage',
    props: {
      children: [
        {
          type: 'h2',
          props: {
            tw: 'text-5xl text-black w-full px-4 text-center',
            children: post.data.title,
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute flex right-4 bottom-4 text-3xl font-bold',
            children: [
              {
                type: 'span',
                props: {
                  tw: 'text-blue-600 font-bold',
                  children: post.data.author,
                },
              },
              {
                type: 'span',
                props: {
                  tw: 'text-black',
                  children: '| Blog',
                },
              },
            ],
          },
        },
      ],
      tw: 'flex w-full h-full items-center px-10',
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
