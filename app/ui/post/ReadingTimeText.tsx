type ReadingTimeProps = {
  readingTime: string;
};

export const ReadingTimeText = ({ readingTime }: ReadingTimeProps) => {
  return (
    <span className="flex items-center justify-end gap-1 text-sm text-gray-500">
      {`읽는 데 ${readingTime}분`}
    </span>
  );
};
