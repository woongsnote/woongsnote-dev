interface DetailHeaderProps {
  title: string;
  description: string;
}

const DetailHeaders = ({ title, description }: DetailHeaderProps) => {
  return (
    <hgroup>
      <h1>{title}</h1>
      <h2 className="text-gray-600 dark:text-gray-300">{description}</h2>
    </hgroup>
  );
};

export default DetailHeaders;
