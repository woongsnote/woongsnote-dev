import { Post, allPosts } from 'contentlayer/generated';
import MainSectionHeader from '../../layouts/MainSectionHeader';
import PostList from '../Post/PostList';
import { getSortedDataList } from 'app/utils/getData';

const MAX_RECENT_POSTS = 4;

const RecentPostListSection = () => {
  const posts: Post[] = getSortedDataList(allPosts, MAX_RECENT_POSTS);

  return (
    <section className="mx-auto">
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
