import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getPostThumbnail } from '@/lib/notion';
import { Post } from '@/components';
import { Suspense } from 'react';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  return paths;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const postMetadata = post.metadata;
  const { title, description, tags } = postMetadata;
  const keywords = tags.join(', ');
  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: `/og?title=${title}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function PostLayout({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const { title, date, tags, thumbnail } = post.metadata;

  const detailThumbnail: string = thumbnail ?? getPostThumbnail(title);

  return (
    <Suspense>
      <Post
        title={title}
        content={post.markdown.parent}
        thumbnail={detailThumbnail}
        date={date}
        tags={tags}
      />
    </Suspense>
  );
}
