import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

// ── 모듈 로드 시 한 번만 실행 ──
const fontSemiBold = fs.readFileSync(
  path.resolve('./src/assets/fonts/WantedSans-SemiBold.otf')
);

// ── OG 이미지 토큰 ──
export const OG = {
  width: 1200,
  height: 630,
  fg: '#fafafa',
  fgMuted: '#737373',
  bg: '#0a0a0a',
} as const;

type OgSlots = {
  top: unknown;
  middle: unknown;
  bottom: unknown;
};

/**
 * OG 이미지 외곽을 책임지는 헬퍼.
 * 모든 OG는 상단 / 중앙 / 하단의 3행 space-between 레이아웃을 공유한다.
 * 각 라우트는 세 영역의 콘텐츠만 제공한다.
 */
export async function renderOgResponse(slots: OgSlots): Promise<Response> {
  const node = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
        backgroundColor: OG.bg,
        color: OG.fg,
        fontFamily: 'WantedSans',
      },
      children: [slots.top, slots.middle, slots.bottom],
    },
  };

  // satori는 plain object 입력을 지원하지만 타입 시그니처는 ReactNode만 노출 → as any로 우회
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(node as any, {
    width: OG.width,
    height: OG.height,
    fonts: [
      { name: 'WantedSans', data: fontSemiBold, weight: 600, style: 'normal' },
    ],
  });

  // satori는 SVG를 반환하지만 OG 이미지는 PNG/JPEG만 안정 지원 (Twitter/Facebook 등 SVG 미지원)
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  // Buffer<ArrayBufferLike> → BodyInit 타입 호환을 위한 wrapping (Node 타입 vs DOM 타입 variance)
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
