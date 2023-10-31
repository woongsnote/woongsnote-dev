import { Post } from '@/.contentlayer/generated';
import { getPostThumbnail } from '@/app/lib/utils';
import Image from 'next/image';
import { PublishedDate } from '.';
import Link from 'next/link';

export const RecentPost = ({ post }: { post: Post }) => {
  const { title, coverImage, date, url } = post;
  const imageUrl = coverImage ?? getPostThumbnail(title);
  return (
    <Link href={`/posts/${url}`}>
      <div className="max-w-xs">
        <div className="w-full h-48 bg-gray-400 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={480}
            quality={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" flex flex-col">
          <strong className="text-2xl">{title}</strong>
          <PublishedDate date={date} />
        </div>
      </div>
    </Link>
  );
};
