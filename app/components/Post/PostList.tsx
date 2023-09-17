'use client';
import { Post } from 'contentlayer/generated';
import { Card } from '../Card';
import { useState } from 'react';
import { SearchBar } from '../Search';

export default function PostList({ posts }: { posts: Post[] }) {
  const [keyword, setKeyword] = useState<string>('');

  const searchedList: Post[] = keyword
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(keyword.toLowerCase()),
      )
    : posts;
  return (
    <>
      <SearchBar setKeyword={setKeyword} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 xl:gap-x-8 pt-4">
        {searchedList.map((post) => (
          <Card
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
    </>
  );
}
