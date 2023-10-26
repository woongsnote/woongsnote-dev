import Image from 'next/image';
import Link from 'next/link';
import { PublishedDate, TagList, Category, ReadingTime } from '@/components';
import { Post } from 'contentlayer/generated';
import { getPostThumbnail } from '@/lib/utils';

const PostCard = (post: Post) => {
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
    <article className="w-full flex items-center">
      <div className="w-36 lg:w-40 h-24 p-2 rounded-lg">
        <Image
          src={cardThumbnail}
          alt={title}
          width={500}
          height={500}
          priority
          className="w-full h-full object-cover rounded-lg border"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 w-full">
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
export default PostCard;
