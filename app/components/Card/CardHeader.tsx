import Image from 'next/image';

type TCardHeaderProps = {
  coverImage: string;
  title: string;
};

export default function CardHeader({ coverImage, title }: TCardHeaderProps) {
  if (coverImage === '') return;

  return (
    <div className="w-full h-48 rounded-md relative">
      <Image
        src={coverImage}
        alt={title}
        priority
        width={500}
        height={500}
        className="w-full h-full rounded-t-md object-cover object-center"
      />
    </div>
  );
}
