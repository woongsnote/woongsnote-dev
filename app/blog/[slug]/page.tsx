import { Post, allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DetailPageHeader,
  DetailPageInfo,
  Utterance,
  MDXComponents,
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
    <article className="py-6 prose dark:prose-invert mx-auto lg:prose-lg prose-h1:mb-1 prose-h2:my-2 prose-hr:my-4">
      <DetailPageHeader title={post.title} description={post.description} />
      <DetailPageInfo
        date={post.date}
        readingTimeText={post.readingTime.text}
      />
      <hr />
      <MDXComponents code={post.body.code} />
      <Utterance />
    </article>
  );
}
