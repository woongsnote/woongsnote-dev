import { Tag } from 'contentlayer/generated';
import { TagItem } from '@/components';

export default function TagList({ tags }: { tags: Tag[] | undefined }) {
  return (
    <div className="flex flex-row gap-2">
      {tags?.map((tag) => <TagItem key={tag.title} title={tag.title} />)}
    </div>
  );
}
