import { RiTimerLine } from 'react-icons/ri';

type ReadingTimeProps = {
  readingTime: string;
};

export function ReadingTime({ readingTime }: ReadingTimeProps) {
  return (
    <span className="flex flex-row items-center justify-end gap-1 text-sm text-gray-500">
      <RiTimerLine />
      {readingTime}분
    </span>
  );
}
