import { Post, allPosts } from 'contentlayer/generated';
import { Suspense } from 'react';
import { getAllTagsFromPosts, getSortedPostList } from '@/app/lib/utils';
import { ListSkeleton, PageHeader } from '@/app/ui/layout';
import { PostList, TagList, RecentPostList } from '@/app/ui/post';

const MAX_RECENT_POSTS = 3;

export default function Posts() {
  const posts: Post[] = getSortedPostList(allPosts);
  const recentPosts: Post[] = posts.slice(0, MAX_RECENT_POSTS);
  const tags: string[] = getAllTagsFromPosts(posts);
  const postsCount = posts.length;
  return (
    <>
      <PageHeader
        title="Posts"
        description="학습한 지식들과 구현한 프로젝트들의 기록입니다."
      />
      <div className="w-full max-w-7xl">
        <RecentPostList recentPosts={recentPosts} />
        <strong className="pl-2 text-2xl">전체 게시글</strong>
        <div className="mt-4 flex flex-row gap-8 xl:gap-28">
          <div className="md:basis-8/12">
            <Suspense fallback={<ListSkeleton listLength={postsCount} />}>
              <PostList posts={posts} />
            </Suspense>
          </div>
          <div className="hidden h-full flex-col p-2 md:flex md:basis-1/4">
            <strong className="mb-4 text-2xl">Tag</strong>
            <TagList tags={tags} />
          </div>
        </div>
      </div>
    </>
  );
}
