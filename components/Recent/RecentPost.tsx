import Link from "next/link";
import { Post } from "contentlayer/generated";

const RecentPost = (post: Post) => {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`}>
      <div className="py-3 px-2 hover:text-indigo-500 shadow-md rounded-lg">
        <h2 className="text-xl font-bold md:text-2xl">{post.title}</h2>
        <p className="text-sm text-gray-400">{post.description}</p>
      </div>
    </Link>
  );
};

export default RecentPost;
