import Link from 'next/link';
export const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const tagUrl = tag !== '전체' ? `/tag/${tag}` : '/posts';
        return (
          <Link href={tagUrl} key={tag}>
            <span className="font-bold p-1 text-xs px-2 py-1 bg-gray-200 text-black dark:text-white dark:bg-gray-700 border border-none rounded-lg w-fit hover:bg-gray-700 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black">
              {tag}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
