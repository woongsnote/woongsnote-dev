import { ListSkeleton, CardList as PostList } from '@/components';
import Profile from '@/components/Profile/Profile';
import Tabs from '@/components/Tabs/Tabs';
import { getAllPosts } from '@/lib/notion';
import { getPostsByCategory, getSortedDataList } from '@/lib/utils';
// import { allPosts } from 'contentlayer/generated';

import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const allPosts = await getAllPosts();
  // console.log(JSON.stringify(posts));

  // const filteredPosts = getPostsByCategory({
  //   category: searchParams['category'],
  //   data: allPosts,
  // });

  return (
    <>
      <Profile />

      <div className="grid grid-cols-12 gap-4 justify-center p-4 lg:p-2">
        <div className="col-span-12 lg:col-span-9">
          <Tabs />

          {/* <Suspense
            fallback={<ListSkeleton listLength={filteredPosts.length} />}
          >
            <PostList articles={getSortedDataList(filteredPosts)} />
          </Suspense> */}
        </div>
      </div>
    </>
  );
}
