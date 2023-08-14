import { Post, allPosts } from 'contentlayer/generated';
import PostList from '../Post/PostList';
import { getSortedDataList } from 'app/utils/getData';
import MainSectionHeader from './MainSectionHeader';

const MAX_RECENT_POSTS = 2;
const POST_SECTION_TITLE = '최신 포스트';
const POST_SECTION_LINK = '/blog';
const POST_SECTION_LABEL = 'ALL POSTS';

export default function RecentPostListSection(): React.ReactElement {
  const posts: Post[] = getSortedDataList(allPosts, MAX_RECENT_POSTS);

  return (
    <section>
      <MainSectionHeader
        title={POST_SECTION_TITLE}
        href={POST_SECTION_LINK}
        label={POST_SECTION_LABEL}
      />
      <PostList posts={posts} />
    </section>
  );
}
