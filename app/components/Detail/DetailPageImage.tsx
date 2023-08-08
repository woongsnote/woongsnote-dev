import Image from 'next/image';
interface DetailPageImageProps {
  coverImage: string;
}
export default function DetailPageImage({ coverImage }: DetailPageImageProps) {
  return (
    <Image
      src={coverImage}
      alt="coverImage"
      priority
      width={512}
      height={380}
      className="rounded-lg w-auto h-auto object-cover shadow-md mx-auto"
    />
  );
}
