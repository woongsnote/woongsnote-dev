import { Post, allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DetailPageHeader,
  Utterance,
  MDXComponents,
  DetailPageImage,
} from '@/components';
import { getPageFromParams } from '@/lib/utils';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = (await getPageFromParams(params, allPosts)) as Post;
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const tags = post.tags?.map((tag) => tag.title).join(', ');
  return {
    title: post.title,
    description: post.description,
    keywords: tags,
    openGraph: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostLayout({ params }: PageProps) {
  const post = (await getPageFromParams(params, allPosts)) as Post;

  if (!post) notFound();

  return (
    <article className="post">
      <DetailPageHeader
        title={post.title}
        description={post.description}
        date={post.date}
        readingTimeText={post.readingTime.text}
      />
      <hr />
      <DetailPageImage coverImage={post.coverImage!} />
      <MDXComponents code={post.body.code} />
      <Utterance />
    </article>
  );
}
