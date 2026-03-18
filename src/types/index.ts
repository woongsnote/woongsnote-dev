// src/types/index.ts
import type { CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  articleDate?: string;
  slug?: string;
}
