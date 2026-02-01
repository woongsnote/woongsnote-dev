import type { CategoryType } from '@/content/_constants/posts';
import type { Category } from '@/types/content/category';
import DiaryIcon from '@/icons/diary.svg';
import ProjectIcon from '@/icons/project.svg';
import TechIcon from '@/icons/tech.svg';

export const CATEGORIES = {
  Diary: { label: 'Diary', icon: DiaryIcon },
  Tech: { label: 'Tech', icon: TechIcon },
  Project: { label: 'Project', icon: ProjectIcon },
} as const satisfies Record<CategoryType, Omit<Category, 'type'>>;

export const getCategory = (type: CategoryType): Category => ({
  type,
  ...CATEGORIES[type],
});
