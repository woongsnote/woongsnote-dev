import { PostCard } from '@/components';
import { Post } from 'contentlayer/generated';
const PostList = ({ posts }: { posts: Post[] }) => {
  if (posts.length < 1) {
    return <p className="p-2">표시할 글이 없습니다!</p>;
  }

  return (
    <ol className="px-4 w-full mx-auto grid grid-cols-1 xl:px-0 mt-2">
      {posts.map((post) => {
        return (
          <li
            key={post._id}
            className="shadow-sm border dark:border-2 rounded-md mb-4 lg:hover:shadow-lg overflow-hidden w-full mx-auto  max-w-3xl lg:hover:bg-slate-200"
          >
            <PostCard {...post} />
          </li>
        );
      })}
    </ol>
  );
};

export default PostList;
