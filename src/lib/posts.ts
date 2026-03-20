// src/lib/posts.ts
// ─── 포스트 조회 · 그룹핑 · 채널(홈/아카이브/RSS 등) ───

import { LIMITS } from '@/config';
import type { PostEntry } from '@/types';
import { getCollection } from 'astro:content';

// ── 내부 캐시 (빌드 중 중복 호출 방지) ──

let _allSortedPromise: Promise<PostEntry[]> | null = null;

const loadAllSorted = async (): Promise<PostEntry[]> => {
  if (!_allSortedPromise) {
    _allSortedPromise = getCollection('posts').then((posts) =>
      [...posts].sort(
        (a, b) =>
          b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
      )
    );
  }
  return _allSortedPromise;
};

// ── 기본 조회 ──

/** 전체 posts (정렬 보장). limit을 지정하면 최신 N개만 반환 */
export const getPosts = async (limit?: number): Promise<PostEntry[]> => {
  const posts = await loadAllSorted();
  return typeof limit === 'number' ? posts.slice(0, limit) : posts;
};

/** slug로 단건 조회 */
export const getPostBySlug = async (
  slug: string
): Promise<PostEntry | undefined> => {
  const posts = await loadAllSorted();
  return posts.find((post) => post.id === slug);
};

// ── 그룹핑 ──

export type PostsByYear = {
  year: number;
  posts: PostEntry[];
};

export const getPostsGroupedByYear = async (): Promise<PostsByYear[]> => {
  const posts = await getPosts();

  const map = new Map<number, PostEntry[]>();
  for (const post of posts) {
    const year = post.data.publishedDate.getFullYear();
    const bucket = map.get(year);
    if (bucket) bucket.push(post);
    else map.set(year, [post]);
  }

  return [...map.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({ year, posts: items }));
};

// ── 채널별 조회 ──

export const getHomePosts = () => getPosts(LIMITS.homePostCount);
export const getArchivePosts = () => getPosts();
export const getRssPosts = () => getPosts(LIMITS.rssItemCount);
export const getSitemapPosts = () => getPosts();
export const getSearchPosts = () => getPosts();

// ── 유틸 ──

export function parseMinutes(input: string): number | null {
  const m = input.match(/\d+/);
  return m ? Number(m[0]) : null;
}