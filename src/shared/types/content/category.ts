import type { SvgComponent } from 'astro/types';
import type { Post } from './post';

export const CATEGORY_TYPES = ['Diary', 'Tech', 'Project'] as const;
export type CategoryType = (typeof CATEGORY_TYPES)[number];

export interface CategoryMeta {
  label: string;
  icon: SvgComponent;
}

export type Category = {
  type: CategoryType;
} & CategoryMeta;

export type CategoryKey = CategoryType;

export type CategoryCounts = Record<CategoryKey, number>;
export type CategoryPosts = Record<CategoryKey, Post[]>;
