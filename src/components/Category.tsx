const defaultCategory =
  'w-fit inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset';
const Category = ({ category }: { category: string }) => {
  if (category.match('Project'))
    return (
      <span
        className={`${defaultCategory} bg-green-50 text-green-500 dark:text-green-700 ring-green-700/10`}
      >
        {category}
      </span>
    );

  if (category.match('Diary'))
    return (
      <span
        className={`${defaultCategory} bg-pink-50 text-pink-500 dark:text-pink-700 ring-pink-700/10`}
      >
        {category}
      </span>
    );

  return (
    <span
      className={`${defaultCategory} bg-blue-50 ring-blue-700/10 text-primary dark:text-secondary`}
    >
      {category}
    </span>
  );
};

export default Category;
