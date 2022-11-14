import Page from "../components/page";
import About from "../components/home/about";
import LatestPosts from "../components/home/posts";
import LatestProjects from "../components/home/projects";

export default function Home() {
  return (
    <Page>
      <About />
      <LatestPosts />
      <LatestProjects />
    </Page>
  );
}
