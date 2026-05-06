import type {
  APIContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'astro';
import { BRAND_DOMAIN } from '@/config';
import { formatDate } from '@/lib/date';
import { OG, renderOgResponse } from '@/lib/og';
import { getPosts } from '@/lib/posts';

export const getStaticPaths = (async () => {
  const posts = await getPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      date: post.data.publishedDate,
      category: post.data.category,
    },
  }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

function pickTitleFontSize(length: number): number {
  if (length <= 12) return 72;
  if (length <= 20) return 60;
  if (length <= 30) return 52;
  if (length <= 42) return 46;
  return 40;
}

export async function GET({ props }: APIContext<Props>) {
  const { title, date, category } = props;
  const formattedDate = formatDate(date);
  const titleFontSize = pickTitleFontSize(title.length);

  return renderOgResponse({
    top: {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '20px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: OG.fgMuted,
              },
              children: category,
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', fontSize: '20px', color: OG.fgMuted },
              children: BRAND_DOMAIN,
            },
          },
        ],
      },
    },
    middle: {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          fontSize: `${titleFontSize}px`,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          color: OG.fg,
          wordBreak: 'keep-all',
        },
        children: title,
      },
    },
    bottom: {
      type: 'div',
      props: {
        style: { display: 'flex', fontSize: '22px', color: OG.fgMuted },
        children: formattedDate,
      },
    },
  });
}
