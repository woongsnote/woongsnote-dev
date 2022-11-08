import Layout from "../components/Layout";
import Hero from "../components/home/Hero";
import LatestPosts from "../components/home/LatestPosts";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LatestPosts />
    </Layout>
  );
}
