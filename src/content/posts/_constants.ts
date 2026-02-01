export const CATEGORY_TYPES = ['Diary', 'Tech', 'Project'] as const;
export type CategoryType = (typeof CATEGORY_TYPES)[number];
