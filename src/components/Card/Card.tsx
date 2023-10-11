import { Tag } from 'contentlayer/generated';
import Image from 'next/image';
import { format } from 'date-fns';
import { TagList } from '@/components';

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
    <article className="group py-4 w-full mx-auto flex items-center gap-8 rounded-md border p-2 shadow-md hover:bg-slate-100 hover:dark:bg-slate-700 my-2 hover:cursor-pointer">
      <div className="hidden lg:block lg:h-56 basis-1/3">
        <Image
          src={coverImage ?? ''}
          alt={title}
          priority
          width={500}
          height={500}
          className="w-full h-full rounded-lg object-center transition-opacity"
        />
      </div>

      <div
        className={`flex flex-col w-full justify-center h-full px-2 md:px-0 ${
          coverImage ? 'lg:basis-2/3' : ''
        }`}
      >
        <time className="text-sm md:text-base text-left text-gray-500 dark:text-gray-300 mb-2">
          {format(new Date(date), 'yyyy. MM. dd')}
        </time>

        <h2 className="text-xl lg:text-3xl font-extrabold mb-2 hover:text-primary dark:hover:text-secondary hover:underline hover:underline-offset-8">
          {title}
        </h2>

        <p className="text-sm md:text-xl text-gray-700 dark:text-gray-300">
          {description}
        </p>

        <TagList tags={tags} />
        <span className="text-sm text-right text-gray-700 dark:text-gray-300">
          {readingTimeText}
        </span>
      </div>
    </article>
  );
}
