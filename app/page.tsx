import Banner from "components/Banner";
import Container from "components/Container";
import RecentPostListSection from "components/RecentPostListSection";
import RecentProjectListSection from "components/RecentProjectListSection";

export default function Home() {

  return (
    <Container>
      <Banner />
      <RecentPostListSection />
      <RecentProjectListSection />
    </Container>
  );
}
