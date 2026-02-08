import type { Category, CategoryType } from '@/shared/types/content/category';
import DiaryIcon from '@/shared/assets/icons/diary.svg';
import ProjectIcon from '@/shared/assets/icons/project.svg';
import TechIcon from '@/shared/assets/icons/tech.svg';

export const CATEGORIES = {
  Diary: { label: 'Diary', icon: DiaryIcon },
  Tech: { label: 'Tech', icon: TechIcon },
  Project: { label: 'Project', icon: ProjectIcon },
} as const satisfies Record<CategoryType, Omit<Category, 'type'>>;

export const getCategory = (type: CategoryType): Category => ({
  type,
  ...CATEGORIES[type],
});
