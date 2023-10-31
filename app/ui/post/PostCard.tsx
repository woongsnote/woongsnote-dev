import Image from 'next/image';
import { Post } from 'contentlayer/generated';
import { getPostThumbnail } from '@/app/lib/utils';
import { PublishedDate, Category, ReadingTime } from '@/app/ui/post';
import Link from 'next/link';

export const PostCard = ({
  title,
  coverImage: thumbnail,
  category,
  date,
  description,
  url,
  readingTime,
}: Post) => {
  const cardThumbnail = thumbnail ?? getPostThumbnail(title);

  return (
    <Link href={`posts/${url}`}>
      <div className="w-full flex flex-col lg:flex-row items-center p-2">
        <div className="w-full md:w-72 flex items-center justify-center m-2 rounded-lg h-48 overflow-hidden relative">
          <Image
            src={cardThumbnail}
            alt={title}
            width={800}
            height={480}
            priority
            quality="100"
            className="w-full h-full object-cover object-center rounded-lg hover:scale-105 absolute transition-all duration-500 ease-in-out transform"
          />
        </div>
        <div className="flex flex-col gap-2 p-2 w-full lg:basis-2/3">
          <Category category={category} />
          <h2 className="text-2xl font-bold hover:underline underline-offset-8 hover:text-primary dark:hover:text-secondary">
            {title}
          </h2>
          <p className="text-base text-gray-500 line-clamp-2">{description}</p>
          <div className="flex justify-between">
            <PublishedDate date={date} />
            <ReadingTime readingTime={readingTime} />
          </div>
        </div>
      </div>
    </Link>
  );
};
