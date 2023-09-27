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
    <article className="group border-b px-2 py-4">
      <div className="flex flex-row justify-between items-center">
        {coverImage && (
          <div className="hidden sm:block h-64 w-3/5">
            <Link href={slug}>
              <Image
                src={coverImage}
                alt={title}
                priority
                width={500}
                height={500}
                className="w-full h-full rounded-lg object-cover object-center hover:scale-105"
              />
            </Link>
          </div>
        )}
        <div className="w-full flex flex-col px-4">
          {date && (
            <time className="text-xs md:text-sm text-left text-gray-700 dark:text-gray-300">
              {format(new Date(date ? date : ''), 'yyyy. MM. dd')}
            </time>
          )}

          <Link
            href={slug}
            className=" hover:text-primary dark:hover:text-secondary hover:underline hover:underline-offset-8"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2">
              {title}
            </h2>
          </Link>
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
            {description}
          </p>

          <TagList tags={tags} />
          <span className="text-xs md:text-sm text-right text-gray-700 dark:text-gray-300">
            {readingTimeText}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Card;
