import { Post } from 'contentlayer/generated';
import { format } from 'date-fns';
const PostDetailHeader = ({ post }: { post: Post }) => {
  return (
    <section className="py-2 mb-8 md:mx-24 md:mt-2">
      <h1 className="text-3xl md:text-5xl font-bold mb-1">{post.title}</h1>
      <div className="flex flex-col md:flex-row md:justify-between md:mt-3">
        <h2 className="text-md md:text-lg text-gray-700 dark:text-gray-300 w-full md:w-fit">
          {post.description}
        </h2>
        <time className="text-sm">
          {format(new Date(post.date), 'yyyy년 MM월 dd일')}
        </time>
      </div>
    </section>
  );
};

export default PostDetailHeader;
