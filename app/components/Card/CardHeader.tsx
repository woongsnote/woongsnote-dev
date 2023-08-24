import Image from 'next/image';

interface CardHeaderProps {
  coverImage: string;
  title: string;
}

export default function CardHeader({ coverImage, title }: CardHeaderProps) {
  if (coverImage === '') return;

  return (
    <Image
      src={coverImage}
      alt={title}
      priority
      width={600}
      height={600}
      className="object-cover w-auto h-64 md:h-80 rounded-t-md"
    />
  );
}
