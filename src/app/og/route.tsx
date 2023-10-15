import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title';

    const size = { width: 1200, height: 630 };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage:
              'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
            fontSize: 64,
            fontWeight: 600,
          }}
        >
          <div style={{ marginTop: 40, color: 'white' }}>{title}</div>
        </div>
      ),

      {
        ...size,
      },
    );
  } catch (error) {
    return new Response(`Failed to generate the Image`, { status: 500 });
  }
}
