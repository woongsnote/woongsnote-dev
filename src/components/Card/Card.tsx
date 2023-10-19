import { Tag } from 'contentlayer/generated';
import { CardImage, CardContent } from '@/components';

type CardProps = {
  title: string;
  description: string;
  tags?: Tag[];
  coverImage?: string;
  date: string;
  readingTime: string;
  url: string;
  category: string;
};

export default function Card({
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
    if (!coverImage || category === 'Tech' || category === 'Diary')
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
        tags={tags!}
      />
    </article>
  );
}
