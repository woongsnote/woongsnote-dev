import { allProjects } from 'contentlayer/generated';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const alt = 'Project CoverImage';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const project = allProjects.find((project) => project.slug === params.slug);
  const imageData = project?.coverImage;

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
        <img src={imageData} alt={alt} />
      </div>
    ),
    { ...size }
  );
}
