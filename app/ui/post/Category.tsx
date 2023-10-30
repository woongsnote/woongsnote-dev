type CategoryProps = {
  category: string;
};

export const Category = ({ category }: CategoryProps) => {
  const currentCategory = category.trim();

  return (
    <span
      className={`w-fit inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-white ${
        currentCategory === 'Project'
          ? 'text-green-500 dark:text-green-700 ring-green-700/10'
          : currentCategory === 'Diary'
          ? 'text-pink-500 dark:text-pink-700 ring-pink-700/10'
          : 'text-primary dark:text-secondary ring-blue-700/10'
      }`}
    >
      {category}
    </span>
  );
};
