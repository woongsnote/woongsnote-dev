import Image from 'next/image';
import Link from 'next/link';
import { TPost } from '@/types';
import Category from './Category';
import { PublishedDate, TagList } from '@/components';
import { getThumbnail } from '@/lib/utils';

const PostCard = (post: TPost) => {
  const { title, thumbnail, category, date, description, slug, tags } = post;

  const cardThumbnail = thumbnail ?? getThumbnail(post.title);

  return (
    <article className="w-full">
      <Link href={`/${slug}`}>
        <Image
          src={cardThumbnail}
          alt={title}
          width={500}
          height={500}
          className="w-full h-44 object-cover"
        />
      </Link>
      <div className="p-2 flex flex-col gap-2">
        <Category category={category} />
        <Link
          href={`/${slug}`}
          className="hover:underline underline-offset-8 hover:text-primary dark:text-secondary"
        >
          <h2 className="text-2xl font-bold">{title}</h2>
        </Link>
        <PublishedDate date={date} />
        <p className="text-base text-gray-500">{description}</p>
        <TagList tags={tags} />
      </div>
    </article>
  );
};
export default PostCard;
