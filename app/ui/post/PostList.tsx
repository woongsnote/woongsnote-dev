import { PostCard } from '@/app/ui/post';
import { Post } from 'contentlayer/generated';
export const PostList = ({ posts }: { posts: Post[] }) => {
  if (posts.length < 1) {
    return <p className="p-2">표시할 글이 없습니다!</p>;
  }

  return (
    <ul className="px-4 w-full mx-auto grid grid-cols-1 xl:px-0 divide-y">
      {posts.map((post) => {
        return (
          <li
            key={post._id}
            className="dark:border-2 rounded-md hover:shadow-lg overflow-hidden w-full mx-auto hover:bg-slate-200 max-w-4xl dark:hover:bg-slate-700"
          >
            <PostCard {...post} />
          </li>
        );
      })}
    </ul>
  );
};
