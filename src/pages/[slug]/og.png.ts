import { getCollection, type CollectionEntry } from 'astro:content';
import { ImageResponse } from '@vercel/og';

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<'posts'> };
}

export async function GET({ props }: Props) {
  const { post } = props;

  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            tw: 'flex flex-col items-center',
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '48px',
                  },
                  children: post.data.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                  },
                  children: post.data.description,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[48px] bottom-[48px] flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-stone-900 text-3xl',
                  children: 'Jiwoong Moon',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'px-2 text-3xl',
                  style: {
                    fontSize: '30px',
                  },
                  children: '|',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-3xl',
                  children: 'Blog',
                },
              },
            ],
          },
        },
      ],
      tw: 'w-full h-full flex items-center justify-center flex-col px-22 text-white',
      style: {
        background: '#0074FF',
      },
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}
