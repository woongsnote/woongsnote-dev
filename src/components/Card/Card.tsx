import { Tag } from 'contentlayer/generated';
import { CardImage, CardContent } from '@/components';

type CardProps = {
  title: string;
  description: string;
  tags?: Tag[];
  coverImage?: string;
  date: string;
  readingTimeText: string;
  type: 'post' | 'project';
};

export default function Card({
  title,
  description,
  tags,
  coverImage,
  date,
  readingTimeText,
  type,
}: CardProps) {
  const category: string = tags?.[0]?.title || '';

  const readingTime: string = readingTimeText?.split('')[0];

  return (
    <article className="postCard group">
      <CardImage cardImage={coverImage || ''} title={title} type={type} />
      <CardContent
        title={title}
        description={description}
        date={date}
        readingTimeText={readingTime}
        category={category}
      />
    </article>
  );
}
