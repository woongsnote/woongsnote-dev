import Page from "../components/page";
import About from "../components/home/about";
import LatestPosts from "../components/home/posts";
import LatestProjects from "../components/home/projects";
import { getPosts } from "./api/get-posts";
import { NextPage } from "next";

export async function getServerSideProps() {
  let { results } = await getPosts();
  return {
    props: {
      posts: results,
    },
  };
}
interface Props {
  posts: [any];
}
const Home: NextPage<Props> = (props) => {
  const latestPosts = props.posts.slice(0, 2);

  return (
    <Page>
      <About />
      <LatestPosts posts={latestPosts} />
      <LatestProjects />
    </Page>
  );
};

export default Home;
