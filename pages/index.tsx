import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from "next";
import Layout from "../components/Layout";
import SocialButtons from "../components/SocialButtons";
import Intro from "../components/Intro";
import { allPosts, Post } from ".contentlayer/generated";
import RecentPosts from "components/Recent/RecentPosts";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ posts: Post[] }>
> {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return {
    props: {
      posts,
    },
  };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <Layout>
      <section className="flex flex-col">
        <Intro />
        <SocialButtons />
      </section>

      <RecentPosts posts={posts} />
    </Layout>
  );
};

export default Home;
