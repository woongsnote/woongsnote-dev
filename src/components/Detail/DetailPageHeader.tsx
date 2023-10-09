import format from 'date-fns/format';
import { Author } from '@/components';

type TDetailHeaderProps = {
  title: string;
  description: string;
  date: string;
  readingTimeText: string;
};

export default function DetailPageHeader({
  title,
  description,
  date,
  readingTimeText,
}: TDetailHeaderProps) {
  return (
    <>
      <h1>{title}</h1>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <div className="w-full flex flex-row justify-between items-center text-sm gap-1 h-fit">
        <Author />
        <p className="flex flex-col text-end ">
          <time>{format(new Date(date), 'yyyy년 MM월 dd일')} </time>
          <span>{`  ${readingTimeText}`}</span>
        </p>
      </div>
    </>
  );
}
