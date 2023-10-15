import Image from 'next/image';

export default function DetailPageImage({
  coverImage,
}: {
  coverImage: string;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <Image
        src={coverImage}
        alt="coverImage"
        priority
        width={500}
        height={500}
        className="rounded-lg w-auto h-auto object-cover shadow-md mx-auto"
      />
    </div>
  );
}
