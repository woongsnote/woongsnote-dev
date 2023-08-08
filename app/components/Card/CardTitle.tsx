interface CardTitleProps {
  title: string;
  description: string;
}

export default function CardTitle({
  title,
  description,
}: CardTitleProps): React.ReactElement {
  return (
    <div className="px-2 pt-1">
      <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
      <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}
