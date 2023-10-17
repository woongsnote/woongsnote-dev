import Image from 'next/image';

type CardImageProps = {
  cardImage: string;
  title: string;
};

export default function CardImage({ cardImage, title }: CardImageProps) {
  return (
    <div className="hidden sm:flex sm:items-center sm:justify-center h-40 lg:h-52 w-full border-x border-t rounded-t-md">
      <Image
        src={cardImage}
        alt={title}
        priority
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-t-md"
      />
    </div>
  );
}
