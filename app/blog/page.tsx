import { Post, allPosts } from 'contentlayer/generated';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getSortedDataList } from '@/lib/utils';
import { PageHeader, SearchBar, PostList } from '@/components';

export const metadata: Metadata = {
  title: { absolute: 'Blog | Woongsnote' },
};

export default function Blog() {
  const posts: Post[] = getSortedDataList(allPosts);

  return (
    <>
      <PageHeader title="Blog" description="학습한 지식들을 기록합니다." />
      <Suspense fallback={<p>게시글 목록을 가져오는 중입니다..</p>}>
        <SearchBar />
        <PostList posts={posts} />
      </Suspense>
    </>
  );
}
