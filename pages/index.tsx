import Page from "../components/page";
import About from "../components/home/about";
import LatestPosts from "../components/home/posts";
import { getPosts } from "./api/get-posts";
import type { NextPage } from "next";
import { Post } from "../types";

export async function getStaticProps() {
  let { results } = await getPosts();

  return {
    props: {
      posts: results,
    },
    revalidate: 10,
  };
}
interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = (props) => {
  const latestPosts =
    props.posts.length > 3 ? props.posts.slice(0, 3) : props.posts;

  return (
    <Page>
      <About />
      <LatestPosts posts={latestPosts} />
    </Page>
  );
};

export default Home;
