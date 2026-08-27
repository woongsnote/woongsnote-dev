// ─── 포스트 조회 · 그룹핑 · 채널(홈/아카이브/RSS 등) ───

import type { PostEntry } from '@/types';
import { getCollection } from 'astro:content';
import getReadingTime from 'reading-time';

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

// ── 유틸 ──

export function parseMinutes(input: string): number | null {
  const m = input.match(/\d+/);
  return m ? Number(m[0]) : null;
}

export function getPostReadingTime(body?: string) {
  return parseMinutes(getReadingTime(body ?? '').text);
}

// ── 이전 / 다음 글 ──

export type PostNavigation = {
  previousPost: PostEntry | null;
  nextPost: PostEntry | null;
};

export const getPostNavigation = async (
  slug: string
): Promise<PostNavigation> => {
  const posts = await getPosts();
  const currentIndex = posts.findIndex((post) => post.id === slug);

  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }

  return {
    // publishedDate 내림차순: 뒤쪽이 더 오래된 글
    previousPost: posts[currentIndex + 1] ?? null,
    nextPost: posts[currentIndex - 1] ?? null,
  };
};

// ── 관련 글: 동일 태그 → 동일 카테고리, 최신 글 fallback 없음 ──

export const getRelatedPosts = async (
  slug: string,
  limit = 3
): Promise<PostEntry[]> => {
  const posts = await getPosts();
  const currentPost = posts.find((post) => post.id === slug);

  if (!currentPost || limit <= 0) return [];

  const candidates = posts.filter((post) => post.id !== slug);
  const selected: PostEntry[] = [];
  const selectedIds = new Set<string>();
  const normalizeTag = (tag: string) => tag.trim().toLowerCase();
  const currentTags = new Set(
    currentPost.data.tags.map(normalizeTag).filter(Boolean)
  );

  const select = (matches: PostEntry[]) => {
    for (const post of matches) {
      if (selected.length >= limit) break;
      if (selectedIds.has(post.id)) continue;

      selected.push(post);
      selectedIds.add(post.id);
    }
  };

  select(
    candidates.filter((post) =>
      post.data.tags.some((tag) => currentTags.has(normalizeTag(tag)))
    )
  );

  select(
    candidates.filter(
      (post) => post.data.category === currentPost.data.category
    )
  );

  return selected;
};
