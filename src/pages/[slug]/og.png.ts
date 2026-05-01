import type { APIContext, GetStaticPaths } from 'astro';
import { getPosts } from '@/lib/posts';
import { formatDate } from '@/lib/date';
import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// ── 모듈 로드 시 한 번만 실행 ──
const fontSemiBold = fs.readFileSync(
  path.resolve('./src/assets/fonts/WantedSans-SemiBold.otf')
);

// 블로그 토큰과 일치하는 색상
const FG = '#fafafa';
const FG_MUTED = '#737373';
const BG = '#0a0a0a';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      date: post.data.publishedDate,
      category: post.data.category,
    },
  }));
};

export async function GET({ props }: APIContext) {
  const { title, date, category } = props as {
    title: string;
    date: Date;
    category: string;
  };

  const formattedDate = formatDate(date);

  // 글자수별 폰트 크기 (5단계, 두 줄 허용)
  const titleFontSize =
    title.length <= 12
      ? 72 // 매우 짧음 — "Read Magic"
      : title.length <= 20
        ? 60 // 짧음 — "생애 첫 아이폰 사용 도전"
        : title.length <= 30
          ? 52 // 보통 — "Astro 블로그에서 카테고리 설계하기"
          : title.length <= 42
            ? 46 // 긴 편 — "Astro 6, Tailwind CSS v4..."
            : 40; // 매우 긴 — 보통 두 줄

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
          padding: '80px',
          backgroundColor: BG,
          color: FG,
          fontFamily: 'WantedSans',
        },
        children: [
          // ─── 상단: 카테고리 + 사이트명 ───
          {
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
                      color: FG_MUTED,
                    },
                    children: category,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontSize: '20px',
                      color: FG_MUTED,
                    },
                    children: 'woongsnote.dev',
                  },
                },
              ],
            },
          },
          // ─── 중앙: 제목 ───
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: `${titleFontSize}px`,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                color: FG,
                wordBreak: 'keep-all',
              },
              children: title,
            },
          },
          // ─── 하단: 날짜 ───
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '22px',
                color: FG_MUTED,
              },
              children: formattedDate,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'WantedSans',
          data: fontSemiBold,
          weight: 600,
          style: 'normal',
        },
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
