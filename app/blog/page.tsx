import { Post, allPosts } from 'contentlayer/generated';
import { PageHeader } from 'app/components/Page';
import { PostList } from 'app/components/Post';
import { getSortedDataList } from 'app/utils/getData';

export const metadata = {
  title: { absolute: 'Blog | Woongsnote' },
};

export default function Blog(): React.ReactElement {
  const posts: Post[] = getSortedDataList(allPosts);

  return (
    <>
      <PageHeader title="Blog" description="학습한 지식들을 기록합니다." />
      <PostList posts={posts} />
    </>
  );
}
