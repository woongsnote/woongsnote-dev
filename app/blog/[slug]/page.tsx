import type { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import PostDetailHeader from "app/layouts/PostDetailHeader";
import Utterance from "app/components/Utterance";
import DetailContainer from "app/layouts/DetailContainer";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug);
  return { title: post?.title };
}

const PostDetail = ({ params }: Props) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  const Content = useMDXComponent(post.body.code);
  return (
    <>
      <PostDetailHeader post={post} />
      <DetailContainer>
        <Content />
      </DetailContainer>
      <Utterance />
    </>
  );
};

export default PostDetail;
