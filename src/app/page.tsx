import { ListSkeleton, CardList as PostList } from '@/components';
import Profile from '@/components/Profile/Profile';
import Tabs from '@/components/Tabs/Tabs';
import { getPostsByCategory, getSortedDataList } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';

import { Suspense } from 'react';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const filteredPosts = getPostsByCategory({
    category: searchParams['category'],
    data: allPosts,
  });

  return (
    <>
      <div className="md:hidden">
        <Profile />
      </div>

      <div className="grid grid-cols-12 gap-4 justify-center p-4 lg:p-2">
        <div className="col-span-12 lg:col-span-9">
          <Tabs />

          <Suspense
            fallback={<ListSkeleton listLength={filteredPosts.length} />}
          >
            <PostList articles={getSortedDataList(filteredPosts)} />
          </Suspense>
        </div>
        <div className="hidden lg:flex col-span-3 max-w-xl">
          <Profile />
        </div>
      </div>
    </>
  );
}
