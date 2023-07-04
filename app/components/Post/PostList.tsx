import { Post } from 'contentlayer/generated';
import PostCard from './PostCard';

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 xl:gap-x-8 pt-4">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
};
export default PostList;
