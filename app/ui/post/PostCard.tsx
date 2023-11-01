import Link from 'next/link';
import Image from 'next/image';
import { Post } from 'contentlayer/generated';
import { getPostThumbnail } from '@/app/lib/utils';
import { PublishedDate, ReadingTime } from '@/app/ui/post';

export const PostCard = ({
  title,
  imgUrl,
  date,
  description,
  url,
  readingTime,
}: Post) => {
  const cardThumbnail = imgUrl ?? getPostThumbnail(title);

  return (
    <Link href={`/posts/${url}`}>
      <div className="w-full flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-72 flex items-center justify-center rounded-lg h-60 lg:h-40 overflow-hidden relative">
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
