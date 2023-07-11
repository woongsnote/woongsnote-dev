import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import PostDetailHeader from 'app/layouts/PostDetailHeader';
import Utterance from 'app/components/Utterance';
import DetailLayout from 'app/layouts/DetailLayout';

type Props = {
  params: { slug: string };
};

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

const PostDetail = ({ params }: Props) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <PostDetailHeader post={post} />
      <DetailLayout>
        <MDXContent />
      </DetailLayout>
      <Utterance />
    </>
  );
};

export default PostDetail;
