import { Post, allPosts } from 'contentlayer/generated';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getSortedDataList } from '@/lib/utils';
import { ImSpinner8 } from 'react-icons/im';
import { PageHeader, SearchBar, PostList } from '@/components';

export const metadata: Metadata = {
  title: { absolute: 'Blog | Woongsnote' },
};

export default function Blog() {
  const posts: Post[] = getSortedDataList(allPosts);

  return (
    <>
      <PageHeader title="Blog" description="학습한 지식들을 기록합니다." />
      <Suspense
        fallback={
          <p className="flex flex-row">
            게시글 목록을 가져오는 중입니다...
            <ImSpinner8 className="animate-spin" />
          </p>
        }
      >
        <SearchBar />
        <PostList posts={posts} />
      </Suspense>
    </>
  );
}
