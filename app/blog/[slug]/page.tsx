import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { DetailPageHeader, DetailPageInfo } from 'app/components/Detail';

interface Props {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({ params }: Props) => {
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
};

export default function PostPage({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <DetailPageHeader title={post.title} description={post.description} />
      <DetailPageInfo
        date={post.date}
        readingTimeText={post.readingTime.text}
      />
      <hr />
      <MDXContent />
    </>
  );
}
