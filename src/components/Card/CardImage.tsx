import Image from 'next/image';

type CardImageProps = {
  cardImage: string;
  title: string;
};

export default function CardImage({ cardImage, title }: CardImageProps) {
  return (
    <div className="CardImageContainer">
      <Image
        src={cardImage}
        alt={title}
        priority
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-md border"
      />
    </div>
  );
}
