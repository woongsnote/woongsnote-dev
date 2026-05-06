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
 *
 * @remarks
 * satori는 JSX(ReactNode)와 plain object 입력을 모두 공식 지원하지만,
 * 타입 시그니처는 ReactNode 한쪽만 노출되어 있다.
 * 여기서는 plain object로 호출하므로 satori 호출 시 `as any` 단언이 필요하며,
 * 이는 라이브러리 한계 회피용으로 그 한 줄에서만 lint를 비활성화한다.
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(node as any, {
    width: OG.width,
    height: OG.height,
    fonts: [
      { name: 'WantedSans', data: fontSemiBold, weight: 600, style: 'normal' },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
