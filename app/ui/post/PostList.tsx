import { PostCard } from '@/app/ui/post';
import { Post } from 'contentlayer/generated';
export const PostList = ({ posts }: { posts: Post[] }) => {
  if (posts.length < 1) {
    return <p className="p-2">표시할 글이 없습니다!</p>;
  }

  return (
    <ul className="w-full grid grid-cols-1 xl:px-0 gap-y-4">
      {posts.map((post) => {
        return (
          <li
            key={post._id}
            className="rounded-md overflow-hidden w-full mx-auto lg:max-w-4xl"
          >
            <PostCard {...post} />
          </li>
        );
      })}
    </ul>
  );
};
