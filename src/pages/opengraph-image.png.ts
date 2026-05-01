import type { APIRoute } from 'astro';
import { siteConfig } from '@/config';
import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// ── 모듈 로드 시 한 번만 실행 ──
const fontSemiBold = fs.readFileSync(
  path.resolve('./src/assets/fonts/WantedSans-SemiBold.otf')
);

const FG = '#fafafa';
const FG_MUTED = '#737373';
const BG = '#0a0a0a';

export const GET: APIRoute = async () => {
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
          // ─── 상단: 사이트명 (로고 위치) ───
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
          // ─── 중앙: 사이트명 (대문) + 설명 ───
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontSize: '96px',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: FG,
                    },
                    children: siteConfig.name,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontSize: '28px',
                      lineHeight: 1.4,
                      color: FG_MUTED,
                      maxWidth: '880px',
                      wordBreak: 'keep-all',
                    },
                    children: siteConfig.description,
                  },
                },
              ],
            },
          },
          // ─── 하단: 빈 공간 ───
          // (justifyContent: space-between 이 작동하도록 빈 div)
          {
            type: 'div',
            props: {
              style: { display: 'flex', height: '20px' },
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
};
