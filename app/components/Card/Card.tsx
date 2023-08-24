import { Tag } from 'contentlayer/generated';
import Link from 'next/link';
import CardLayout from './CardLayout';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

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
}: CardProps) {
  return (
    <Link href={slug} className="group">
      <CardLayout>
        <CardHeader coverImage={coverImage ? coverImage : ''} title={title} />
        <CardBody title={title} description={description} tags={tags} />
        <CardFooter
          date={date ? date : ''}
          readingTimeText={readingTimeText ? readingTimeText : ''}
        />
      </CardLayout>
    </Link>
  );
}
