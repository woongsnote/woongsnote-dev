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
      className="rounded-t-lg object-cover h-80"
    />
  );
};

export default CardHeader;
