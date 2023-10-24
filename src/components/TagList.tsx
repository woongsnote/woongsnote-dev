const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-2">
      {tags?.map((tag) => (
        <span
          key={tag}
          className="font-bold p-1 text-xs px-2 py-1 bg-gray-500 text-white rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
