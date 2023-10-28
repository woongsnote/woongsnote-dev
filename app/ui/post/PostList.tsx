import { PostCard } from '@/app/ui/post';
import { Post } from 'contentlayer/generated';
export const PostList = ({ posts }: { posts: Post[] }) => {
  if (posts.length < 1) {
    return <p className="p-2">표시할 글이 없습니다!</p>;
  }

  return (
    <ol className="px-4 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:px-0 mt-2">
      {posts.map((post) => {
        return (
          <li
            key={post._id}
            className="shadow-sm border dark:border-2 rounded-md mb-4 hover:shadow-lg overflow-hidden w-full mx-auto hover:bg-slate-200 max-w-sm xl:max-w-md"
          >
            <PostCard {...post} />
          </li>
        );
      })}
    </ol>
  );
};
