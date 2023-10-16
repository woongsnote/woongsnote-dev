import { Tag } from 'contentlayer/generated';
import { CardImage, CardContent } from '@/components';

type CardProps = {
  title: string;
  description: string;
  tags?: Tag[];
  coverImage?: string;
  date: string;
  readingTime: string;
  type: 'post' | 'project';
};

export default function Card({
  title,
  description,
  tags,
  coverImage,
  date,
  readingTime,
  type,
}: CardProps) {
  const getCategory = (): string => {
    return tags && tags.length > 0 ? tags[0].title : '';
  };

  const category: string = getCategory();

  return (
    <article className="postCard group">
      <CardImage
        cardImage={coverImage ? coverImage : ''}
        title={title}
        type={type}
      />
      <CardContent
        title={title}
        description={description}
        date={date}
        readingTime={readingTime}
        category={category}
      />
    </article>
  );
}
