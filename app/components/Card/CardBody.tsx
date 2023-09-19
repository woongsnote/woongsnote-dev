import { Tag } from 'contentlayer/generated';
import TagList from './TagList';

type TCardBodyProps = {
  title: string;
  description: string;
  tags?: Tag[];
};

export default function CardBody({ title, description, tags }: TCardBodyProps) {
  return (
    <>
      <div className="px-2 pt-1">
        <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
      <TagList tags={tags} />
    </>
  );
}
