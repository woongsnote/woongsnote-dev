import { Post, allPosts } from 'contentlayer/generated';
import { getSortedDataList } from 'app/lib/utils';
import MainSectionHeader from './MainSectionHeader';
import { PostList } from '../Post';

const MAX_RECENT_POSTS = 2;

export default function RecentPostListSection() {
  const posts: Post[] = getSortedDataList(allPosts, MAX_RECENT_POSTS);

  return (
    <section>
      <MainSectionHeader title="최신 게시글" href="/blog" label="모든 게시글" />
      <PostList posts={posts} />
    </section>
  );
}
