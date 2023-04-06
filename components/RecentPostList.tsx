import { Post } from "contentlayer/generated";
import PostCard from "./PostCard";
import MainSectionHeader from "./MainSectionHeader";

const RecentPostList = ({ posts }: { posts: Post[] }) => {
  return (
    <section className="mx-auto">
      <MainSectionHeader title={"최신 포스트"} href={"/blog"} label={"ALL POSTS"} />
      <hr />
      <div className="grid gap-y-4 gap-x-6 xl:gap-x-8 pt-4">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
};
export default RecentPostList;
