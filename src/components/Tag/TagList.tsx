// import { Tag } from 'contentlayer/generated';
import { TagItem } from '@/components';

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-row gap-2">
      {tags?.map((tag) => <TagItem key={tag} title={tag} />)}
    </div>
  );
}
