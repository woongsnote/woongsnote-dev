import Link from "next/link";
import { Post } from "contentlayer/generated";

const PostCard = (post: Post) => {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`}>
      <div className="py-3 hover:font-bold">
        <h3 className="text-xl">{post.title}</h3>
        <p className="text-sm">{post.description}</p>
        <time>{post.date}</time>
      </div>
    </Link>
  );
};

export default PostCard;
