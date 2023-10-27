import { Tag } from 'contentlayer/generated';

export const TagList = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="flex gap-2">
      {tags?.map((tag) => (
        <span
          key={tag.title}
          className="font-bold p-1 text-xs px-2 py-1 bg-white text-gray-500 border border-gray-500 rounded-full"
        >
          {tag.title}
        </span>
      ))}
    </div>
  );
};
