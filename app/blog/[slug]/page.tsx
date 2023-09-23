import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { DetailPageHeader, DetailPageInfo, Utterance } from '@/components';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug);
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

export default function Page({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="py-6 prose dark:prose-invert mx-auto lg:prose-lg prose-h1:mb-1 prose-h2:my-2 prose-hr:my-4">
      <DetailPageHeader title={post.title} description={post.description} />
      <DetailPageInfo
        date={post.date}
        readingTimeText={post.readingTime.text}
      />
      <hr />
      <MDXContent />
      <Utterance />
    </article>
  );
}
