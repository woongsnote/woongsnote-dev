import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import CardContent from '../Card/CardContent';
import CardFooter from '../Card/CardFooter';
import CardLayout from '../Card/CardLayout';

const PostCard = ({
  slug,
  date,
  title,
  description,
  tags,
  readingTime,
}: Post): React.ReactElement => {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <CardLayout>
        <CardContent title={title} description={description} tags={tags} />
        <CardFooter date={date} readingTimeText={readingTime.text} />
      </CardLayout>
    </Link>
  );
};

export default PostCard;
