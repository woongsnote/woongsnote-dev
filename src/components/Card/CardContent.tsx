import { PublishedDate, ReadingTime, TagList } from '@/components';
import Link from 'next/link';
import Category from './Category';
import { Tag } from 'contentlayer/generated';

type CardContentProps = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  url: string;
  tags: Tag[];
};

export default function CardContent({
  category,
  title,
  description,
  date,
  readingTime,
  url,
  tags,
}: CardContentProps) {
  return (
    <div className="CardContentContainer">
      <Category category={category} />
      <Link href={url} aria-label={`go to ${title}`}>
        <h2 className="hover:text-primary hover:dark:text-secondary transition-all w-full hover:underline hover:underline-offset-8 text-lg lg:text-3xl font-bold truncate">
          {title}
        </h2>
      </Link>
      <p className="text-sm lg:text-lg text-gray-700 dark:text-gray-300 w-full truncate">
        {description}
      </p>

      <TagList tags={tags} />

      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300 w-full">
        <PublishedDate date={date} />
        <ReadingTime readingTime={readingTime} />
      </div>
    </div>
  );
}
