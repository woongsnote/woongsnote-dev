import { Post } from '@/.contentlayer/generated';
import { getPostThumbnail } from '@/app/lib/utils';
import Image from 'next/image';
import { PublishedDate } from '@/app/ui/post';
import Link from 'next/link';

export const RecentPost = ({ post }: { post: Post }) => {
  const { title, imgUrl, date, url } = post;
  const imageUrl = imgUrl ?? getPostThumbnail(title);
  return (
    <Link href={`/posts/${url}`}>
      <div className="w-full">
        <div className="w-80 h-40 bg-gray-400 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={480}
            quality={100}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" flex flex-col">
          <strong className="text-base lg:text-lg">{title}</strong>
          <PublishedDate date={date} />
        </div>
      </div>
    </Link>
  );
};
