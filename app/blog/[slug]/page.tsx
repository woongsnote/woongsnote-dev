import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import format from 'date-fns/format';

interface Props {
  params: { slug: string };
}

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({ params }: Props) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return {
    title: post.title,
    description: post.description,
  };
};

export default function PostPage({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <time className="text-sm">
        {format(new Date(post.date), 'yyyy년 MM월 dd일')}
      </time>
      <h1 className="mb-2">{post.title}</h1>
      <p className="text-xl my-0">{post.description}</p>
      <hr className="my-4" />
      <MDXContent />
    </>
  );
}
