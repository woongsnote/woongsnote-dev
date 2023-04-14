import type { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allPosts } from "@/.contentlayer/generated";
import Container from "@/components/Container";
import PostDetailHeader from "@/components/PostDetailHeader";
import Utterance from "components/Utterance";

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

const PostDetail = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  const Content = useMDXComponent(post!!.body.code);
  return (
    <Container>
      <PostDetailHeader post={post!!} />
      <article className="prose dark:prose-invert lg:prose-xl  mx-auto">
        <Content />
      </article>
      <Utterance />
    </Container>
  );
};

export default PostDetail;
