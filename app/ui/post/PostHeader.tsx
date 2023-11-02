import { PostHeaderProps } from '@/app/lib/types';
import { PublishedDate, TagList, ReadingTimeText } from '@/app/ui/post';

export const PostHeader = ({
  title,
  author,
  date,
  readingTime,
  tags,
}: PostHeaderProps) => {
  return (
    <section className="border-b pb-4">
      <h1 className="text-3xl font-black lg:text-5xl">{title}</h1>
      <div className="mx-auto my-4 flex w-full items-center justify-start gap-2">
        <span className="font-bold">{author}</span>
        <PublishedDate date={date} />
        <ReadingTimeText readingTime={readingTime} />
      </div>
      <TagList tags={tags} />
    </section>
  );
};
