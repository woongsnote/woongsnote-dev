import { Tag } from 'contentlayer/generated';
import { format } from 'date-fns';
import { CardImage, PublishedDate, ReadingTime } from '@/components';

type CardProps = {
  title: string;
  description: string;
  tags?: Tag[];
  coverImage?: string;
  date: string;
  readingTimeText?: string;
};

export default function Card({
  title,
  description,
  tags,
  coverImage,
  date,
  readingTimeText,
}: CardProps) {
  return (
    <article className="group w-full mx-auto flex flex-col items-center rounded-md border shadow-md hover:bg-slate-100 hover:dark:bg-slate-700 my-2 hover:cursor-pointer hover:-translate-y-2 transition delay-150">
      <CardImage cardImage={coverImage!} title={title} />

      <div className="flex flex-col w-full justify-center p-4">
        <span className="text-sm lg:text-lg text-primary dark:text-secondary font-extrabold">
          {tags![0].title}
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
    </article>
  );
}
