import { Tabs, ListSkeleton, PostList } from '@/components';
import { getPostsByCategory, getSortedDataList } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';
import { Suspense } from 'react';

export default async function Posts({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const posts = getSortedDataList(allPosts);

  const filteredPosts = getPostsByCategory({
    category: searchParams['category'],
    data: posts,
  });

  return (
    <>
      <Tabs />
      <Suspense fallback={<ListSkeleton listLength={filteredPosts.length} />}>
        <PostList posts={filteredPosts} />
      </Suspense>
    </>
  );
}
