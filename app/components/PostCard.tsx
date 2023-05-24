import Link from "next/link";
import { Post } from "contentlayer/generated";

const PostCard = (post: Post) => {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
      <article className="py-3 px-2 hover:text-indigo-500 shadow-md rounded-lg dark:border-2 dark:border-gray-500 md:group-hover:scale-105 transition-transform duration-200 ease-out" >
        <h2 className="text-xl font-bold md:text-2xl">{post.title}</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {post.description}
        </p>
      </article>
    </Link>
  );
};

export default PostCard;
