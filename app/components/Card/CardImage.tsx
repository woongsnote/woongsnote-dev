import Image from 'next/image';

interface CardImageProps {
  coverImage: string;
  title: string;
}

export default function CardImage({
  coverImage,
  title,
}: CardImageProps): React.ReactElement {
  return (
    <Image
      src={coverImage}
      alt={title}
      priority
      width={600}
      height={600}
      className="object-cover w-auto h-80 rounded-t-md"
    />
  );
}
