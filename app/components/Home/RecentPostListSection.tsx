import { Post, allPosts } from 'contentlayer/generated';
import PostList from '../Post/PostList';
import { getSortedDataList } from 'app/utils/getData';
import MainSectionHeader from '../MainSectionHeader';

const MAX_RECENT_POSTS = 2;

const RecentPostListSection = (): React.ReactElement => {
  const posts: Post[] = getSortedDataList(allPosts, MAX_RECENT_POSTS);

  return (
    <section>
      <MainSectionHeader
        title={'최신 포스트'}
        href={'/blog'}
        label={'ALL POSTS'}
      />
      <hr />
      <PostList posts={posts} />
    </section>
  );
};
export default RecentPostListSection;
