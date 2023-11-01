import { Post, allPosts } from 'contentlayer/generated';
import { Suspense } from 'react';
import {
  getAllTagsFromPost as getAllTagsFromPosts,
  getPostsByTag,
  getSortedPostList,
} from '@/app/lib/utils';
import { ListSkeleton } from '@/app/ui/layout';
import { PostList, TagList } from '@/app/ui/post';
import { RecentPostList } from '../ui/post/RecentPostList';
import { PageHeader } from '../ui/layout/PageHeader';

const MAX_RECENT_POSTS = 3;

export default function Posts() {
  const posts: Post[] = getSortedPostList(allPosts);
  const recentPosts: Post[] = posts.slice(0, MAX_RECENT_POSTS);

  const tags: string[] = getAllTagsFromPosts(allPosts);

  return (
    <>
      <PageHeader
        title="Posts"
        description="학습한 지식들과 구현한 프로젝트들의 기록입니다."
      />
      <div className="max-w-7xl w-full">
        <RecentPostList recentPosts={recentPosts} />
        <strong className="text-2xl pl-2">전체 게시글</strong>
        <div className="flex flex-row gap-8 xl:gap-28 mt-4">
          <div className="md:basis-8/12">
            <Suspense fallback={<ListSkeleton listLength={posts.length} />}>
              <PostList posts={posts} />
            </Suspense>
          </div>
          <div className="hidden md:flex flex-col h-full p-2 md:basis-1/4">
            <strong className="text-2xl mb-4">Tag</strong>
            <TagList tags={tags} />
          </div>
        </div>
      </div>
    </>
  );
}
