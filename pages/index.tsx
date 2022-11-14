import Page from "../components/page";
import Hero from "../components/home/hero";
import LatestPosts from "../components/home/posts";
import LatestProjects from "../components/home/projects";

export default function Home() {
  return (
    <Page>
      <Hero />
      <LatestPosts />
      <LatestProjects />
    </Page>
  );
}
