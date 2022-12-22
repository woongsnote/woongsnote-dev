import Link from "next/link";
import { Post } from "contentlayer/generated";

const PostCard = (post: Post) => {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`}>
      <div className="py-3 px-2 my-2 hover:text-indigo-500">
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {post.description}
        </p>
        <time className="text-sm text-gray-500 dark:text-gray-300">
          {post.date}
        </time>
      </div>
    </Link>
  );
};

export default PostCard;
