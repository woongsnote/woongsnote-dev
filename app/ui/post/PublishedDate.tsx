import format from 'date-fns/format';

type PublishedDateProps = {
  date: string;
};
export const PublishedDate = ({ date }: PublishedDateProps) => {
  return (
    <time className="text-sm text-gray-500">
      {format(new Date(date), 'yyyy. MM. dd')}
    </time>
  );
};
