import { Tag } from 'contentlayer/generated';
import Link from 'next/link';
import CardTags from './CardTags';
import CardFooter from './CardFooter';
import CardImage from './CardImage';
import CardTitle from './CardTitle';

interface CardProps {
  slug: string;
  title: string;
  description: string;
  tags?: Tag[];
  coverImage?: string;
  date?: string;
  readingTimeText?: string;
}

export default function Card({
  slug,
  title,
  description,
  tags,
  coverImage,
  date,
  readingTimeText,
}: CardProps): React.ReactElement {
  return (
    <Link href={slug} className="group">
      <article className="hover:text-indigo-500 shadow-md rounded-lg dark:border-2 dark:border-white md:group-hover:scale-105 transition-transform duration-200 ease-out flex flex-col justify-center">
        {coverImage && <CardImage coverImage={coverImage} title={title} />}
        <CardTitle title={title} description={description} />
        <CardTags tags={tags} />
        {date && readingTimeText && (
          <CardFooter date={date} readingTimeText={readingTimeText} />
        )}
      </article>
    </Link>
  );
}
