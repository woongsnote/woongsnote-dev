import type { SvgComponent } from 'astro/types';
import type { Post } from './post';

export const CATEGORY_TYPES = ['Diary', 'Tech', 'Project'] as const;

export type CategoryType = (typeof CATEGORY_TYPES)[number];

export interface Category {
  type: CategoryType;
  label: string;
  icon: SvgComponent;
}
export type CategoryKey = string;

export type CategoryCounts = Record<CategoryKey, number>;

export type CategoryPosts = Record<CategoryKey, Post[]>;
