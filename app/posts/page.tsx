import { allPosts } from 'contentlayer/generated';
import { Suspense } from 'react';
import { getPostsByCategory, getSortedDataList } from '@/app/lib/utils';
import { Tabs, ListSkeleton } from '@/app/ui/layout';
import { PostList } from '@/app/ui/post';

export default function Posts({
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
