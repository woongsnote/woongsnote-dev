//src/shared/types/content/post.ts
import type { CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export type PostData = PostEntry['data'];

export type PostId = PostEntry['id'];

export type Post = PostData & {
  id: PostId;
  slug: PostId;
  minutesToRead: number;
  readingTimeText: string;
  href: string;
};

export type PostTag = PostData['tags'][number];
