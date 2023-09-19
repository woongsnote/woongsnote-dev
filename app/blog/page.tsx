import { Post, allPosts } from 'contentlayer/generated';
import { getSortedDataList } from 'app/lib/utils';
import { PageHeader } from 'app/components/Page';
import { SearchBar } from 'app/components/Search';
import { PostList } from 'app/components/Post';
import { Suspense } from 'react';

export const metadata = {
  title: { absolute: 'Blog | Woongsnote' },
};

export default function Page() {
  const posts: Post[] = getSortedDataList(allPosts);

  return (
    <>
      <PageHeader title="Blog" description="학습한 지식들을 기록합니다." />
      <SearchBar />
      <Suspense fallback={<>Loading...</>}>
        <PostList posts={posts} />
      </Suspense>
    </>
  );
}
