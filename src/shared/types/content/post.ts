// src/shared/types/content/post.ts
import type { CollectionEntry } from 'astro:content';

/**
 * 1️⃣ Astro 원본 entry
 */
export type PostEntry = CollectionEntry<'posts'>;

/**
 * 2️⃣ Frontmatter (raw data)
 */
export type PostFrontmatter = PostEntry['data'];

/**
 * 3️⃣ ID / Slug
 */
export type PostId = PostEntry['id'];

/**
 * 4️⃣ 가공된 도메인 모델 (UI에서 사용하는 타입)
 */
export type PostModel = PostFrontmatter & {
  id: PostId;
  slug: PostId;
  minutesToRead: number;
  readingTimeText: string;
  href: string;
};

/**
 * 5️⃣ Tag 타입
 */
export type PostTag = PostFrontmatter['tags'][number];
