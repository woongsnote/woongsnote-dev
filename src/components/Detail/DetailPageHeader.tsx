import format from 'date-fns/format';

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
      <div className="flex flex-row justify-end items-center py-2 text-sm gap-1">
        <time>{format(new Date(date), 'yyyy년 MM월 dd일')} </time>
        <span>{`|  ${readingTimeText}`}</span>
      </div>
    </>
  );
}
