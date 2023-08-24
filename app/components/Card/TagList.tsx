import { Tag } from 'contentlayer/generated';
import TagItem from './TagItem';

interface TagListProps {
  tags?: Tag[];
}
export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-row gap-2 mt-2 px-2 pb-2">
      {tags?.map((tag) => <TagItem key={tag.title} title={tag.title} />)}
    </div>
  );
}
