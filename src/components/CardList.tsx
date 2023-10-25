import { PostCard } from '@/components';
import { TPost } from '@/types';
const CardList = ({ posts }: { posts: TPost[] }) => {
  if (posts.length < 1) {
    return <p className="p-2">표시할 글이 없습니다!</p>;
  }

  return (
    <ol className="px-4 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:px-0">
      {posts.map((post) => {
        return (
          <li
            key={post.id}
            className="shadow-sm border dark:border-2 rounded-md my-2 lg:hover:shadow-lg overflow-hidden w-full max-w-sm mx-auto"
          >
            <PostCard {...post} />
          </li>
        );
      })}
    </ol>
  );
};

export default CardList;
