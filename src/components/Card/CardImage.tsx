import Image from 'next/image';

type CardImageProps = {
  cardImage: string;
  title: string;
  type: 'post' | 'project';
};

export default function CardImage({ cardImage, title, type }: CardImageProps) {
  return (
    <div className="hidden sm:flex sm:items-center sm:justify-center rounded-t-md h-40 lg:h-56 overflow-hidden w-full">
      <Image
        src={type === 'post' ? `/og?title=${title}` : cardImage}
        alt={title}
        priority
        width={500}
        height={500}
        className="w-full h-auto object-cover transition-opacity"
      />
    </div>
  );
}
