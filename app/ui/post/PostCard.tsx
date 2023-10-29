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
  console.log(url);
  return (
    <article className="w-full flex flex-col items-center">
      <div className="w-full h-48 p-2 rounded-lg xl:h-60">
        <Image
          src={cardThumbnail}
          alt={title}
          width={800}
          height={480}
          priority
          className="w-full h-full object-cover object-center rounded-lg border"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 w-full">
        <Category category={category} />
        <Link
          href={`/posts/${url.split('/')[1]}`}
          className="hover:underline underline-offset-8 hover:text-primary dark:text-secondary"
        >
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
        </Link>
        <p className="text-base text-gray-500 line-clamp-2">{description}</p>
        <TagList tags={tags!} />
        <div className="flex justify-between">
          <PublishedDate date={date} />
          <ReadingTime readingTime={readingTimeText} />
        </div>
      </div>
    </article>
  );
};
