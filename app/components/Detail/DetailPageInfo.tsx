import format from 'date-fns/format';

interface DetailPageInfoProps {
  date: string;
  readingTimeText: string;
}
export default function DetailPageInfo({
  date,
  readingTimeText,
}: DetailPageInfoProps) {
  return (
    <div className="flex flex-row justify-end items-center py-2 text-sm gap-1">
      <time>{format(new Date(date), 'yyyy년 MM월 dd일')} </time>
      <span>{`|  ${readingTimeText}`}</span>
    </div>
  );
}
