import { Post } from "@/.contentlayer/generated";

const PostDetailHeader = ({ post }: { post: Post }) => {
  return (
    <section className="py-2 mb-8 mx-24">
      <h1 className="text-5xl font-bold mb-1">{post.title}</h1>
      <div className="flex justify-between items-center">
        <h2 className="text-md md:text-lg text-gray-700 dark:text-gray-300">
          {post.description}
        </h2>
        <time className="text-sm">{post.date}</time>
      </div>
    </section>
  );
};

export default PostDetailHeader;
