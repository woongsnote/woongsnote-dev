import { Post, allPosts } from 'contentlayer/generated';
import { Suspense } from 'react';
import { getSortedDataList } from 'app/lib/utils';
import { PageHeader } from 'app/components/Page';
import { SearchBar } from 'app/components/Search';
import { PostList } from 'app/components/Post';

export const metadata = {
  title: { absolute: 'Blog | Woongsnote' },
};

export default function Page() {
  const posts: Post[] = getSortedDataList(allPosts);

  return (
    <>
      <PageHeader title="Blog" description="학습한 지식들을 기록합니다." />
      <SearchBar />
      <Suspense fallback={<p>게시글 목록을 가져오는 중입니다..</p>}>
        <PostList posts={posts} />
      </Suspense>
    </>
  );
}
