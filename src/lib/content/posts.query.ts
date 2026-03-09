import type { PostEntry } from '@/shared/types';
import { getCollection } from 'astro:content';

const sortByPublishedDateDesc = (a: PostEntry, b: PostEntry) =>
  b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf();

/**
 * 내부 캐시 (빌드 중 중복 호출 방지)
 */
let _allSortedPromise: Promise<PostEntry[]> | null = null;


const loadAllSorted = async (): Promise<PostEntry[]> => {
  if (!_allSortedPromise) {
    _allSortedPromise = getCollection('posts').then((posts) => {
      return [...posts].sort(sortByPublishedDateDesc);
    });
  }
  return _allSortedPromise;
};

/**
 * 전체 posts (정렬 보장)
 * @param limit 최신 N개만 필요하면 지정
 */
export const getPosts = async (limit?: number): Promise<PostEntry[]> => {
  const posts = await loadAllSorted();
  return typeof limit === 'number' ? posts.slice(0, limit) : posts;
};

/**
 * slug로 단건 조회 (캐시 재사용)
 */
export const getPostBySlug = async (
  slug: string
): Promise<PostEntry | undefined> => {
  const posts = await loadAllSorted();
  return posts.find((post) => post.id === slug);
};