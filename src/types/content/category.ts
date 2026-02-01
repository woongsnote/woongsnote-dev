import type { SvgComponent } from 'astro/types';
import type { Post } from './post';
import type { CategoryType } from '@/content/_constants/posts';

export interface Category {
  type: CategoryType;
  label: string;
  icon: SvgComponent;
}

export type CategoryKey = CategoryType; // ✅ string 대신 이게 더 안전함(권장)

export type CategoryCounts = Record<CategoryKey, number>;
export type CategoryPosts = Record<CategoryKey, Post[]>;
