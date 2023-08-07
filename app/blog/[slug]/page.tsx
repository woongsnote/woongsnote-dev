import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import format from 'date-fns/format';
import DetailHeaders from 'app/components/DetailHeaders';

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
      <DetailHeaders title={post.title} description={post.description} />
      <div className="flex flex-row justify-end items-center py-2 text-sm gap-1">
        <time>{format(new Date(post.date), 'yyyy년 MM월 dd일')} </time>
        <span>{post.readingTime ? `|  ${post.readingTime.text}` : ''}</span>
      </div>
      <hr />
      <MDXContent />
    </>
  );
}
