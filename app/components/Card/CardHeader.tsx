import Image from 'next/image';

const CardHeader = ({
  coverImage,
  title,
}: {
  coverImage: string;
  title: string;
}) => {
  return (
    <Image
      src={coverImage}
      alt={title}
      priority
      width={600}
      height={600}
      className="h-80 object-center w-full mb-1"
    />
  );
};

export default CardHeader;
