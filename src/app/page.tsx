import {
  CardList as RecentPostList,
  CardList as RecentProjectList,
  HeroSection,
  MainSectionHeader,
} from '@/components';
import { getSortedDataList } from '@/lib/utils';
import { allPosts, allProjects } from 'contentlayer/generated';

const MAX_ARTICLES = 2;

export default function Home() {
  const recentPosts = getSortedDataList(allPosts, MAX_ARTICLES);

  const recentProjects = getSortedDataList(allProjects, MAX_ARTICLES);

  return (
    <>
      <HeroSection />
      <MainSectionHeader title="최신 게시글" href="/blog" label="모든 게시글" />
      <RecentPostList articles={recentPosts} type={'post'} />

      <hr className="w-full my-4 lg:my-10 border-none" />

      <MainSectionHeader
        title="최신 프로젝트"
        href="/projects"
        label="모든 프로젝트"
      />
      <RecentProjectList articles={recentProjects} type={'project'} />
    </>
  );
}
