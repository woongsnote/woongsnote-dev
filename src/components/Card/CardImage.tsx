import Image from 'next/image';
import Link from 'next/link';

type CardImageProps = {
  cardImage: string;
  title: string;
  url: string;
};

export default function CardImage({ cardImage, title, url }: CardImageProps) {
  return (
    <Link href={url} className="w-full h-44">
      <Image
        src={cardImage}
        alt={title}
        priority
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-t-md"
      />
    </Link>
  );
}
