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
      <section className="p-2 w-full">
        <h2 className="font-black text-3xl">Posts</h2>
        <p>학습한 지식들과 구현한 프로젝트들의 기록입니다.</p>
      </section>

      <Tabs />
      <Suspense fallback={<ListSkeleton listLength={filteredPosts.length} />}>
        <PostList posts={filteredPosts} />
      </Suspense>
    </>
  );
}
