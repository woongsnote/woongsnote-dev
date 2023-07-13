import Banner from './components/Home/Banner';
import RecentPostListSection from './components/Home/RecentPostListSection';
import RecentProjectListSection from './components/Home/RecentProjectListSection';

export default function Home() {
  return (
    <>
      <Banner />
      <RecentPostListSection />
      <RecentProjectListSection />
    </>
  );
}
