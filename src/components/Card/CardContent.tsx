import { PublishedDate, ReadingTime } from '@/components';
import Link from 'next/link';

type CardContentProps = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  url: string;
};

export default function CardContent({
  category,
  title,
  description,
  date,
  readingTime,
  url,
}: CardContentProps) {
  return (
    <div className="flex flex-col w-full justify-center p-4 gap-1 border-x border-t md:border-t-0 border-b rounded-md lg:rounded-b-md">
      <span className="w-fit inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary dark:text-secondary ring-1 ring-inset ring-blue-700/10">
        {category}
      </span>

      <Link href={url} aria-label={`go to ${title}`}>
        <h2 className="hover:text-primary hover:dark:text-secondary transition-all w-full hover:underline hover:underline-offset-8 text-lg lg:text-xl font-bold mb-2">
          {title}
        </h2>
      </Link>

      <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 mb-2">
        {description}
      </p>

      <div className="flex justify-between mt-2 items-center text-sm text-gray-500 dark:text-gray-300">
        <PublishedDate date={date} />
        <ReadingTime readingTime={readingTime} />
      </div>
    </div>
  );
}
