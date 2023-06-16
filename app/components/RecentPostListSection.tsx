import { Post, allPosts } from "contentlayer/generated";
import MainSectionHeader from "./MainSectionHeader";
import PostList from "./PostList";
import { getSortedDataList } from "utils/getData";

const MAX_RECENT_POSTS = 4;

const RecentPostListSection = () => {

  const posts: Post[] = getSortedDataList(allPosts, MAX_RECENT_POSTS);

  return (
    <section className="mx-auto">
      <MainSectionHeader
        title={"최신 포스트"}
        href={"/blog"}
        label={"ALL POSTS"}
      />
      <hr />
      <PostList posts={posts} />
    </section>
  );
};
export default RecentPostListSection;
