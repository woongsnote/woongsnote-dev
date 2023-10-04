import { Tag } from 'contentlayer/generated';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { TagList } from '@/components';

type CardProps = {
  slug: string;
  title: string;
  description: string;
  tags?: Tag[];
  coverImage?: string;
  date: string;
  readingTimeText?: string;
};

const Card = ({
  slug,
  title,
  description,
  tags,
  coverImage,
  date,
  readingTimeText,
}: CardProps) => {
  return (
    <article className="group border-b px-2 py-4 w-full flex items-center gap-8 hover:shadow-md hover:scale-105 transition">
      {coverImage && (
        <div className="hidden md:block lg:h-60 basis-1/3">
          <Link href={slug}>
            <Image
              src={coverImage}
              alt={title}
              priority
              width={500}
              height={500}
              className="w-full h-full rounded-lg object-center"
            />
          </Link>
        </div>
      )}
      <div
        className={`flex flex-col w-full justify-center h-full ${
          coverImage && 'md:basis-2/3'
        }`}
      >
        <time className="text-sm md:text-md text-left text-gray-500 dark:text-gray-300">
          {format(new Date(date), 'yyyy. MM. dd')}
        </time>

        <Link
          href={slug}
          className=" hover:text-primary dark:hover:text-secondary hover:underline hover:underline-offset-8"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2">{title}</h2>
        </Link>
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
};

export default Card;