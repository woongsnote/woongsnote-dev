import { allPosts, Post } from "contentlayer/generated";
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsResult,
} from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import DetailHeader from "components/DetailHeader";
import Layout from "components/Layout";
import Utterance from "components/Utterance";

export async function getStaticPaths() {
  const paths = allPosts.map((post) => ({ params: { slug: post.slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<{ post: Post }>> {
  const post = allPosts.find((post) => post.slug === params!.slug);
  return typeof post === "undefined"
    ? {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    : {
        props: {
          post,
        },
      };
}

const PostDetail: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const Component = useMDXComponent(post.body.code);

  return (
    <Layout>
      <DetailHeader data={post} />
      <article className="prose dark:prose-invert lg:prose-xl  mx-auto">
        <Component />
      </article>
      <Utterance />
    </Layout>
  );
};

export default PostDetail;
