import { Tag } from 'contentlayer/generated';
import { CardImage, CardContent } from '@/components';
import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  tags?: Tag[];
  coverImage?: string;
  date: string;
  readingTime: string;
  type: 'post' | 'project';
  url: string;
};

export default function PostCard({
  title,
  description,
  tags,
  coverImage,
  date,
  readingTime,
  type,
  url,
}: CardProps) {
  const getCategory = (): string => {
    return tags && tags.length > 0 ? tags[0].title : '';
  };

  const category: string = getCategory();

  const getThumbNailImage = () => {
    if (!coverImage || type === 'post')
      return `https://woongsnote.dev/og?title=${title}`;

    return coverImage;
  };

  const thumbnailImage: string = getThumbNailImage();

  return (
    <article className="PostCard group">
      <div className="PostCardImageContainer">
        <Image
          src={thumbnailImage}
          alt={title}
          priority
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </article>
  );
}
