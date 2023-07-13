import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import format from 'date-fns/format';

const PostCard = (post: Post) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="py-3 px-2 hover:text-indigo-500 shadow-md rounded-lg dark:border-2 dark:border-gray-500 md:group-hover:scale-105 transition-transform duration-200 ease-out flex flex-col md:flex-row md:gap-4">
        <div className="flex justify-center flex-col">
          <time className="text-sm text-gray-700 dark:text-gray-300">
            {format(new Date(post.date), 'yyyy년 MM월 dd일')}
          </time>
          <h2 className="text-xl font-bold md:text-2xl">{post.title}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
