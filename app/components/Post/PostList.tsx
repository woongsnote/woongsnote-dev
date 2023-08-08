import { Post } from 'contentlayer/generated';
import { Card } from '../Card';

export default function PostList({
  posts,
}: {
  posts: Post[];
}): React.ReactElement {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 xl:gap-x-8 pt-4">
      {posts.map((post) => (
        <Card
          key={post._id}
          slug={`/blog/${post.slug}`}
          title={post.title}
          description={post.description}
          date={post.date}
          tags={post.tags}
          readingTimeText={post.readingTime.text}
        />
      ))}
    </div>
  );
}
