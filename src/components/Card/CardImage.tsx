import Image from 'next/image';

type CardImageProps = {
  cardImage: string | undefined;
};

export default function CardImage({ cardImage }: CardImageProps) {
  const image = cardImage ? cardImage : '';

  return <Image src={image} alt="" className="" />;
}
