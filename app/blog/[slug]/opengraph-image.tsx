import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const alt = 'Blog Post';
export const size = {
  width: 800,
  height: 480,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          fontWeight: 700,
          background: 'white',
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              backgroundColor: 'black',
              color: '#4a90e2',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
          >
            W
          </span>
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            woongsnote.dev
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '0 42px',
            fontSize: 32,
            width: '100%',
            maxWidth: 700,
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
            lineHeight: 1.4,
          }}
        >
          <span>{params.slug}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
