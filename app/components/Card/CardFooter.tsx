import { format } from 'date-fns';

const CardFooter = ({
  date,
  readingTimeText,
}: {
  date: string;
  readingTimeText: string;
}) => {
  return (
    <p className="text-xs md:text-sm text-right text-gray-700 dark:text-gray-300 pr-2 pb-2">
      <time>{format(new Date(date), 'yyyy년 MM월 dd일')}</time>
      <span> | {readingTimeText}</span>
    </p>
  );
};

export default CardFooter;
