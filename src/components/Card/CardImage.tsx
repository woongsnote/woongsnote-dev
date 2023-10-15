import Image from 'next/image';

type CardImageProps = {
  cardImage: string;
  title: string;
};

export default function CardImage({ cardImage, title }: CardImageProps) {
  return (
    <div className="hidden sm:flex sm:items-center sm:justify-center rounded-md h-48 mx-4 overflow-hidden mb-4">
      <Image
        src={cardImage}
        alt={title}
        priority
        width={500}
        height={500}
        className="w-full h-auto rounded-lg object-cover transition-opacity"
      />
    </div>
  );
}
