import { Author, PublishedDate, ReadingTime } from '@/components';

type DetailHeaderProps = {
  title: string;
  description: string;
  date: string;
  readingTimeText: string;
};

export default function DetailPageHeader({
  title,
  description,
  date,
  readingTimeText,
}: DetailHeaderProps) {
  return (
    <>
      <h1>{title}</h1>
      <p className="text-gray-600 dark:text-gray-300 !mt-0">{description}</p>
      <div className="w-full flex flex-row justify-between items-center text-sm gap-1 h-fit">
        <Author />
        <p className="flex flex-col text-end">
          <PublishedDate date={date} />
          <ReadingTime readingTime={readingTimeText.split('')[0] as string} />
        </p>
      </div>
    </>
  );
}
