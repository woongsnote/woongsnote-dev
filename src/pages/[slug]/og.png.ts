import type { APIContext, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      date: post.data.publishedDate,
      tags: post.data.tags ?? [],
    },
  }));
};

export async function GET({ props }: APIContext) {
  const { title, date, tags } = props as {
    title: string;
    date: Date;
    tags: string[];
  };

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 폰트 파일 로드 (프로젝트에 맞게 경로 수정)
  const fontRegular = fs.readFileSync(
    path.resolve('./public/fonts/Pretendard-Regular.otf')
  );
  const fontBold = fs.readFileSync(
    path.resolve('./public/fonts/Pretendard-Bold.otf')
  );

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background:
            'linear-gradient(145deg, #1a1b2e 0%, #16172b 50%, #1a1b2e 100%)',
          color: '#e2e8f0',
          fontFamily: 'Pretendard',
        },
        children: [
          // 상단: 태그
          {
            type: 'div',
            props: {
              style: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
              children: tags.slice(0, 3).map((tag) => ({
                type: 'span',
                props: {
                  style: {
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#818cf8',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '18px',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                  },
                  children: tag,
                },
              })),
            },
          },
          // 중앙: 제목
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: title.length > 30 ? '42px' : '52px',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: '#f1f5f9',
                      margin: 0,
                      letterSpacing: '-0.02em',
                      wordBreak: 'keep-all',
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          // 하단: 날짜 + 사이트
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                paddingTop: '24px',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { fontSize: '20px', color: '#94a3b8' },
                    children: formattedDate,
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#818cf8',
                    },
                    children: 'woongsnote.dev',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Pretendard', data: fontRegular, weight: 400, style: 'normal' },
        { name: 'Pretendard', data: fontBold, weight: 700, style: 'normal' },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
