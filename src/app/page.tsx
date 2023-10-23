import { CardList, ListSkeleton } from '@/components';
import { Profile } from '@/components/Profile';
import { Tabs } from '@/components/Tabs/Tabs';
import { getAllPosts } from '@/lib/notion';
import { getPostsByCategory } from '@/lib/utils';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const posts = await getAllPosts();

  const filteredPosts = getPostsByCategory({
    category: searchParams['category'],
    data: posts,
  });

  return (
    <>
      <Profile />
      <Tabs />
      <Suspense fallback={<ListSkeleton listLength={filteredPosts.length} />}>
        <CardList articles={filteredPosts} />
      </Suspense>
    </>
  );
}
