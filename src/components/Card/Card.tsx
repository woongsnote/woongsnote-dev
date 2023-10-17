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
  url: string;
};

export default function Card({
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
    <article className="Card group">
      <CardImage cardImage={thumbnailImage} title={title} />
      <CardContent
        url={url}
        title={title}
        description={description}
        date={date}
        readingTime={readingTime}
        category={category}
      />
    </article>
  );
}
