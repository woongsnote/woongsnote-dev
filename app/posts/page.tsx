import { allPosts } from 'contentlayer/generated';
import { Suspense } from 'react';
import { getPostsByCategory, getSortedDataList } from '@/app/lib/utils';
import { Tabs, ListSkeleton } from '@/app/ui/layout';
import { PostList } from '@/app/ui/post';
import { RecentPostList } from '../ui/post/RecentPostList';

const RECENT_LIST = 3;

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

  const recentPosts = filteredPosts.slice(0, RECENT_LIST);

  return (
    <div className="p-2">
      {/* <section className="w-full border-b pb-2 lg:my-4">
        <h2 className="font-black text-3xl">Posts</h2>
        <p>학습한 지식들과 구현한 프로젝트들의 기록입니다.</p>
      </section> */}
      <div className="max-w-7xl w-full">
        <RecentPostList recentPosts={recentPosts} />
        <div className="flex flex-row lg:gap-28">
          <div className="lg:basis-8/12">
            <strong className="text-xl">전체 게시글</strong>
            {/* <Tabs /> */}
            <Suspense
              fallback={<ListSkeleton listLength={filteredPosts.length} />}
            >
              <PostList posts={filteredPosts} />
            </Suspense>
          </div>
          <div className="hidden md:block border lg:basis-1/4">Tag list</div>
        </div>
      </div>
    </div>
  );
}
