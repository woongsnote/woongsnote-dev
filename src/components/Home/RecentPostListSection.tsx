import { Post, allPosts } from 'contentlayer/generated';
import { getSortedDataList } from '@/lib/utils';
import { PostList, MainSectionHeader } from '@/components';

const MAX_RECENT_POSTS = 2;

export default function RecentPostListSection() {
  const posts: Post[] = getSortedDataList(allPosts, MAX_RECENT_POSTS);

  return (
    <section className="w-full my-4 mx-auto">
      <MainSectionHeader title="최신 게시글" href="/blog" label="모든 게시글" />
      <PostList posts={posts} />
    </section>
  );
}
