import Image from 'next/image';

interface CardHeaderProps {
  coverImage: string;
  title: string;
}

export default function CardHeader({ coverImage, title }: CardHeaderProps) {
  if (coverImage === '') return;

  return (
    <div className="w-full h-48 rounded-md relative">
      <Image
        src={coverImage}
        alt={title}
        priority
        width={300}
        height={300}
        className="w-full h-full rounded-t-md object-cover object-center"
      />
    </div>
  );
}
