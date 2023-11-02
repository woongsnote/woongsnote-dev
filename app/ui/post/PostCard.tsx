import Link from 'next/link';
import Image from 'next/image';
import { Post } from 'contentlayer/generated';
import { getPostThumbnail } from '@/app/lib/utils';
import { PublishedDate, ReadingTimeText } from '@/app/ui/post';

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
      <div className="flex flex-col items-center w-full lg:flex-row">
        <div className="relative flex items-center justify-center w-full overflow-hidden rounded-lg lg:w-72 h-60 lg:h-40">
          <Image
            src={cardThumbnail}
            alt={title}
            width={800}
            height={480}
            priority
            quality="100"
            className="absolute object-cover object-center w-full h-full transition-all duration-500 ease-in-out transform rounded-lg hover:scale-105"
          />
        </div>
        <div className="flex flex-col w-full gap-2 p-2 lg:basis-2/3">
          <h2 className="text-2xl font-bold hover:underline underline-offset-8 hover:text-primary">
            {title}
          </h2>
          <p className="text-base text-gray-500 line-clamp-2">{description}</p>
          <div className="flex justify-between">
            <PublishedDate date={date} />
            <ReadingTimeText readingTime={readingTime} />
          </div>
        </div>
      </div>
    </Link>
  );
};
