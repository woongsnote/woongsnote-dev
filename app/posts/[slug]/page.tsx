import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Post, allPosts } from 'contentlayer/generated';
import { getPostThumbnail } from '@/app/lib/utils';
import { PostHeader, MDXComponents, Comments } from '@/app/ui/post';
import { PageProps } from '@/app/lib/types';
import { PostThumbnail } from '@/app/ui/post/PostThumbnail';

export async function generateStaticParams() {
  return allPosts.map((post: Post) => ({
    slug: post.url,
  }));
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = allPosts.find((post) => post.url === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const tags = post.tags.join(', ');
  return {
    title: post.title,
    description: post.description,
    keywords: tags,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: `/og?title=${post.title}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = allPosts.find((post) => post.url === params.slug);

  if (!post) notFound();

  const { title, date, readingTime, imgUrl, tags } = post;

  const thumbnail = imgUrl ?? getPostThumbnail(title);

  return (
    <article className="mx-auto mb-10 flex w-full max-w-5xl flex-col px-4 py-4 pt-6">
      <PostHeader
        title={title}
        author="@woongsnote"
        date={date}
        readingTime={readingTime}
        tags={tags}
      />
      <PostThumbnail title={title} thumbnail={thumbnail} />
      <div className="prose mx-auto mt-4 w-full items-center text-base leading-10 dark:prose-invert lg:max-w-5xl lg:text-xl">
        {post.body.code && <MDXComponents code={post.body.code} />}
      </div>
      <Comments />
    </article>
  );
}
