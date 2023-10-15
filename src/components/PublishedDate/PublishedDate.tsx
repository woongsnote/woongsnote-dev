import format from 'date-fns/format';

type PublishedDateProps = {
  date: string;
};
export default function PublishedDate({ date }: PublishedDateProps) {
  return <time>{format(new Date(date), 'yyyy. MM. dd')}</time>;
}
