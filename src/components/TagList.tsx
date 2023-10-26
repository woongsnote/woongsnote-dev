import { Tag } from 'contentlayer/generated';

const TagList = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="flex gap-2">
      {tags?.map((tag) => (
        <span
          key={tag.title}
          className="font-bold p-1 text-xs px-2 py-1 bg-gray-500 text-white rounded-full"
        >
          {tag.title}
        </span>
      ))}
    </div>
  );
};

export default TagList;
