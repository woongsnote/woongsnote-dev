import { allPosts, allProjects } from "contentlayer/generated";
import Banner from "components/Banner";
import Container from "components/Container";
import RecentPostList from "components/RecentPostList";
import RecentProjectList from "components/RecentProjectList";
import { compareDesc } from "date-fns";

export default function Home() {
  const recentPosts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  const recentProjects = allProjects
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 2);

  return (
    <Container>
      <Banner />
      <RecentPostList posts={recentPosts} />
      <RecentProjectList projects={recentProjects} />
    </Container>
  );
}
