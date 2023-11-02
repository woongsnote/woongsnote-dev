import { allPosts } from '@/.contentlayer/generated';
import {
  getAllTagsFromPosts,
  getPostsByTag,
  getSortedPostList,
} from '@/app/lib/utils';
import { ListSkeleton } from '@/app/ui/layout';
import { PageHeader } from '@/app/ui/layout/PageHeader';
import { PostList, TagList } from '@/app/ui/post';
import { Suspense } from 'react';

export default function TagPage({ params }: { params: { tagName: string } }) {
  const { tagName } = params;
  const sortedPosts = getSortedPostList(allPosts);
  const searchedPosts = getPostsByTag({ tag: tagName, posts: sortedPosts });
  const tags = getAllTagsFromPosts(sortedPosts);
  return (
    <>
      <PageHeader
        title="Searched Posts"
        description={`${params.tagName}에 대한 검색 결과는 총 ${searchedPosts.length}건입니다.`}
      />
      <div className="mt-10 flex flex-row gap-8 xl:gap-28">
        <div className="mt-4 md:basis-8/12">
          <Suspense
            fallback={<ListSkeleton listLength={searchedPosts.length} />}
          >
            <PostList posts={searchedPosts} />
          </Suspense>
        </div>
        <div className="hidden md:flex flex-col h-full p-2 md:basis-1/4">
          <strong className="text-2xl mb-4">Tag</strong>
          <TagList tags={tags} />
        </div>
      </div>
    </>
  );
}
