import Image from 'next/image';
import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import { getPostThumbnail } from '@/app/lib/utils';
import { PublishedDate, TagList, Category, ReadingTime } from '@/app/ui/post';

export const PostCard = (post: Post) => {
  const {
    title,
    coverImage: thumbnail,
    category,
    date,
    description,
    url,
    tags,
    readingTime,
  } = post;

  const cardThumbnail = thumbnail ?? getPostThumbnail(post.title);
  const readingTimeText = readingTime.text.split(' ')[0];

  return (
    <article className="w-full flex flex-col md:flex-row items-center">
      <div className="w-full h-48 md:w-1/3 lg:w-1/4 md:h-full p-2 rounded-lg">
        <Image
          src={cardThumbnail}
          alt={title}
          width={500}
          height={500}
          priority
          className="w-full h-full object-cover object-center rounded-lg border"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 w-full lg:w-3/4">
        <Category category={category} />
        <Link
          href={`/posts/${url}`}
          className="hover:underline underline-offset-8 hover:text-primary dark:text-secondary"
        >
          <h2 className="text-2xl font-bold">{title}</h2>
        </Link>
        <p className="text-base text-gray-500">{description}</p>
        <TagList tags={tags!} />
        <div className="flex justify-between">
          <PublishedDate date={date} />
          <ReadingTime readingTime={readingTimeText} />
        </div>
      </div>
    </article>
  );
};
