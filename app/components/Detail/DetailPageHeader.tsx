interface DetailHeaderProps {
  title: string;
  description: string;
}

export default function DetailPageHeader({
  title,
  description,
}: DetailHeaderProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
