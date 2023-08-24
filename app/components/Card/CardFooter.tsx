import format from 'date-fns/format';

interface CardFooterProps {
  date: string;
  readingTimeText: string;
}

export default function CardFooter({ date, readingTimeText }: CardFooterProps) {
  if (date === '' || readingTimeText === '') return;

  return (
    <p className="text-xs md:text-sm text-right text-gray-700 dark:text-gray-300 pr-2 pb-2">
      <time>{format(new Date(date), 'yyyy년 MM월 dd일')}</time>
      <span> | {readingTimeText}</span>
    </p>
  );
}
