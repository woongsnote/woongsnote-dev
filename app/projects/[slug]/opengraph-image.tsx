import { Project, allProjects } from 'contentlayer/generated';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const alt = 'Project CoverImage';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{params.slug}</span>
      </div>
    ),
    { ...size }
  );
}
