type ReadingTimeProps = {
  readingTime: string;
};

const ReadingTime = ({ readingTime }: ReadingTimeProps) => {
  return (
    <span className="flex items-center justify-end gap-1 text-sm text-gray-500">
      {`읽는데 ${readingTime}분`}
    </span>
  );
};

export default ReadingTime;
