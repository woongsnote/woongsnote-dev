import { allPosts, Post } from 'contentlayer/generated';
import { Suspense } from 'react';
import { getSortedDataList } from '@/app/lib/utils';
import { ListSkeleton } from '@/app/ui/layout';
import { PostList } from '@/app/ui/post';
import { Profile } from '@/app/ui/profile';

const MAIN_POSTS_LENGTH = 3;

export default function Home() {
  const latestPosts: Post[] = getSortedDataList(allPosts).slice(
    0,
    MAIN_POSTS_LENGTH,
  );
  return (
    <>
      <Profile />
      <hr className="w-full mx-auto mb-2" />
      <h2 className="text-xl lg:text-3xl font-black mx-auto text-start px-2">
        Latest Posts
      </h2>
      <Suspense fallback={<ListSkeleton listLength={MAIN_POSTS_LENGTH} />}>
        <PostList posts={latestPosts} />
      </Suspense>
    </>
  );
}
