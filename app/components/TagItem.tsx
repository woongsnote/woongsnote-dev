interface TagItemProps {
  title: string;
}

const TagItem = ({ title }: TagItemProps) => {
  return (
    <span className="border font-bold rounded-lg p-1 text-xs text-gray-700 dark:text-gray-300">
      {title}
    </span>
  );
};

export default TagItem;
