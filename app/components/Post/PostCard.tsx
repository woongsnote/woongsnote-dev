import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import format from 'date-fns/format';
import TagItem from '../TagItem';

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
      <article className="py-3 px-2 hover:text-indigo-500 shadow-md rounded-lg dark:border-2 dark:border-gray-500 md:group-hover:scale-105 transition-transform duration-200 ease-out flex flex-col md:gap-4">
        <div className="flex justify-center flex-col">
          <h2 className="text-2xl font-bold md:text-2xl">{title}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {description}
          </p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 p-2">
              {tags?.map((tag) => (
                <TagItem key={tag.title} title={tag.title} />
              ))}
            </div>
            <p className="text-xs md:text-sm text-right text-gray-700 dark:text-gray-300">
              <time>{format(new Date(date), 'yyyy년 MM월 dd일')}</time>
              <span> | {readingTime.text}</span>
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
