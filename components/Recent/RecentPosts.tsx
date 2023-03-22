import { Post } from "contentlayer/generated";
import RecentPost from "./RecentPost";

const RecentPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <section>
      <h2 className="text-2xl pb-2 my-4 font-bold border-b">최신 포스트</h2>
      <div className="grid gap-y-4 gap-x-6 xl:gap-x-8 pt-2">
        {posts.slice(0, 3).map((post) => (
          <RecentPost key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
};
export default RecentPosts;
