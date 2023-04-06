import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from "next";
import { allPosts, allProjects, Post, Project } from ".contentlayer/generated";
import RecentPostList from "@/components/RecentPostList";
import Banner from "@/components/Banner";
import RecentProjectList from "@/components/RecentProjectList";
import MainSectionHeader from "@/components/MainSectionHeader";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ posts: Post[]; projects: Project[] }>
> {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  const projects = allProjects.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return {
    props: {
      posts,
      projects,
    },
  };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  projects,
}) => {
  return (
    <>
      <Banner />
      <RecentPostList posts={posts} />
      <RecentProjectList projects={projects} />
    </>
  );
};

export default Home;
