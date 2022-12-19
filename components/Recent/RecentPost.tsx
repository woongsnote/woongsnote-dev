import Link from "next/link";
import { Post } from "contentlayer/generated";

const RecentPost = (post: Post) => {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`}>
      <div className="py-3 hover:font-bold border px-2 rounded-xl my-2">
        <h3 className="text-xl">{post.title}</h3>
        <p className="text-sm">{post.description}</p>
      </div>
    </Link>
  );
};

export default RecentPost;
