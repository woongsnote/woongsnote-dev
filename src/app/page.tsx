import { HeroSection, CardList as RecentPostList } from '@/components';
import { getSortedDataList } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';

const MAX_ARTICLES = 3;

export default function Home() {
  const recentPosts = getSortedDataList(allPosts, MAX_ARTICLES);

  return (
    <>
      <HeroSection />
      <h2 className="text-xl lg:text-3xl font-bold py-2 px-2 w-full col-span-1 lg:col-span-3">
        Latest Posts
      </h2>
      <section className="CardList">
        <RecentPostList articles={recentPosts} />
      </section>

      <div className="flex items-center justify-center w-full mt-4">
        <Link href={'/posts'} className="border p-2 rounded-lg">
          View More
        </Link>
      </div>
    </>
  );
}
