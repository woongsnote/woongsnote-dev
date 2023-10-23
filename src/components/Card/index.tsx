// import { Tag } from 'contentlayer/generated';
import Image from 'next/image';
import Link from 'next/link';
import Category from './Category';
import { ReadingTime, TagList } from '@/components';
import { RiArrowRightLine } from 'react-icons/ri';

type CardProps = {
  title: string;
  description: string;
  tags?: string[];
  coverImage?: string;
  date: string;
  readingTime: string;
  url: string;
  category: string;
};

type CardImageProps = {
  thumbnailImage: string;
  title: string;
  url: string;
};

const CardImage = ({ url, title, thumbnailImage }: CardImageProps) => {
  return (
    <Link href={url} className="w-full h-56 lg:h-40">
      <Image
        src={thumbnailImage}
        alt={title}
        priority
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-t-md"
      />
    </Link>
  );
};

const CardTitle = ({ title, url }: { title: string; url: string }) => {
  return (
    <Link
      href={url}
      aria-label={`go to ${title}`}
      className="hover:text-primary hover:dark:text-secondary transition-all w-full hover:underline underline-offset-8 text-lg lg:text-2xl font-bold"
    >
      <h2>{title}</h2>
    </Link>
  );
};

const CardDescription = ({ description }: { description: string }) => {
  return (
    <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 w-full truncate">
      {description}
    </p>
  );
};

export function Card({
  title,
  description,
  tags,
  coverImage,
  date,
  readingTime,
  url,
  category,
}: CardProps) {
  const getThumbNailImage = () => {
    if (!coverImage) return `https://woongsnote.dev/og?title=${title}`;

    return coverImage;
  };

  const thumbnailImage: string = getThumbNailImage();

  return (
    <article className="Card group">
      <CardImage thumbnailImage={thumbnailImage} title={title} url={url} />
      <div className="CardContentContainer">
        <Category category={category} />
        <CardTitle title={title} url={url} />
        <CardDescription description={description} />
        {tags && <TagList tags={tags} />}
        <div className="flex flex-row justify-between py-2">
          <Link
            href={url}
            className="w-fit flex flex-row items-center gap-1 hover:text-primary dark:hover:text-secondary px-2 py-1 text-sm hover:underline hover:underline-offset-8 hover:font-bold"
          >
            Read Post
            <RiArrowRightLine />
          </Link>
          <ReadingTime readingTime={readingTime} />
        </div>
      </div>
    </article>
  );
}
