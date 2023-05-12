import { Post } from "contentlayer/generated";
import PostCard from "./PostCard";

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
      <div className="grid gap-y-4 gap-x-6 xl:gap-x-8 pt-4">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
  
  );
};
export default PostList;
