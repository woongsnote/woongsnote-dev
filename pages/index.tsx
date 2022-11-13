import Layout from "../components/layout";
import Hero from "../components/home/Hero";
import LatestPosts from "../components/home/LatestPosts";
import LatestProjects from "../components/home/LatestProjects";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LatestPosts />
      <LatestProjects />
    </Layout>
  );
}
