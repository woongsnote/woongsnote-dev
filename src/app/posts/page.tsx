'use client';
import { useState } from 'react';
import { CardList as PostList } from '@/components';
import { getPostsByCategory, getSortedDataList } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';
export default function Posts() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech', 'Diary', 'Project'];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const renderCategories = categories.map((category) => (
    <button
      key={category}
      onClick={() => handleCategorySelect(category)}
      className={`${
        selectedCategory === category
          ? 'text-primary underline underline-offset-8'
          : 'text-gray-500'
      } px-2`}
    >
      {category}
    </button>
  ));

  const filteredPosts = getPostsByCategory({
    category: selectedCategory,
    data: allPosts,
  });

  return (
    <>
      <div className="flex flex-row gap-2 text-2xl my-4 w-full justify-center">
        {renderCategories}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-4 gap-6">
        <PostList articles={getSortedDataList(filteredPosts)} type={'post'} />
      </section>
    </>
  );
}
