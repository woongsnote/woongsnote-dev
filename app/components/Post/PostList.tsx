'use client';

import { Post } from 'contentlayer/generated';
import { useSearchParams } from 'next/navigation';
import { Card as PostCard } from '../Card';

export default function PostList({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const searchedList: Post[] = search
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()),
      )
    : posts;

  if (searchedList.length === 0)
    return (
      <h3 className="mt-8 text-center text-2xl">
        <span className="font-extrabold">{search}</span>에 대한 검색 결과가
        없어요. 다시 검색해 주세요!
      </h3>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 xl:gap-x-8 pt-4">
      {searchedList.map((post) => (
        <PostCard
          key={post._id}
          slug={`/blog/${post.slug}`}
          title={post.title}
          description={post.description}
          date={post.date}
          tags={post.tags}
          readingTimeText={post.readingTime.text}
          coverImage={post.coverImage}
        />
      ))}
    </div>
  );
}
