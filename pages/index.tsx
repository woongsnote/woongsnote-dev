import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from "next";
import { allPosts, Post } from ".contentlayer/generated";
import RecentPostList from "@/components/RecentPostList";
import Banner from "@/components/Banner";

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
    <>
      <Banner />
      <RecentPostList posts={posts} />
    </>
  );
};

export default Home;
