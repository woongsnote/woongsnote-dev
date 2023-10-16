import { PublishedDate, ReadingTime } from '@/components';

type CardContentProps = {
  title: string;
  description: string;
  date: string;
  readingTimeText: string;
  category: string;
};

export default function CardContent({
  category,
  title,
  description,
  date,
  readingTimeText,
}: CardContentProps) {
  return (
    <div className="flex flex-col w-full justify-center p-4 gap-1">
      <span className="w-fit inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary dark:text-secondary ring-1 ring-inset ring-blue-700/10">
        {category}
      </span>

      <h2 className="text-lg lg:text-xl font-extrabold mb-2 hover:text-primary dark:hover:text-secondary hover:underline hover:underline-offset-8">
        {title}
      </h2>

      <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 mb-2">
        {description}
      </p>

      <div className="flex justify-between mt-2 items-center text-sm text-gray-500 dark:text-gray-300">
        <PublishedDate date={date} />
        <ReadingTime readingTime={readingTimeText?.split('')[0] as string} />
      </div>
    </div>
  );
}
