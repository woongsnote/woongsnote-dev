import { HeroSection, CardList as RecentPostList } from '@/components';
import { getSortedDataList } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';

const MAX_ARTICLES = 2;

export default function Home() {
  const recentPosts = getSortedDataList(allPosts, MAX_ARTICLES);

  return (
    <>
      <HeroSection />
      <h2 className="text-xl lg:text-3xl font-bold my-2 py-2 px-12 lg:px-0">
        Latest Posts
      </h2>
      <section className="grid grid-cols-1 w-full gap-4 px-12 lg:px-0">
        <RecentPostList articles={recentPosts} type={'post'} />
      </section>

      <div className="flex items-center justify-center w-full mt-4">
        <Link href={'/posts'} className="border p-2 rounded-lg">
          View More
        </Link>
      </div>
    </>
  );
}
