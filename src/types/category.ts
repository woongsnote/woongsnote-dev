// src/types/category.ts
import type { SvgComponent } from 'astro/types';

export const CATEGORY_TYPES = ['Diary', 'Tech', 'Project'] as const;

export type CategoryType = (typeof CATEGORY_TYPES)[number];

export interface CategoryMeta {
  label: string;
  icon: SvgComponent;
}

export type Category = { type: CategoryType } & CategoryMeta;
