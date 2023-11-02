import { PostThumbnailProps } from '@/app/lib/types';
import Image from 'next/image';

export const PostThumbnail = ({ title, thumbnail }: PostThumbnailProps) => {
  return (
    <div className="mx-auto flex w-full max-w-xl items-center overflow-hidden p-4">
      <Image
        src={thumbnail}
        alt={title}
        width={800}
        height={480}
        priority
        className="h-60 w-full rounded-md object-cover lg:h-72"
      />
    </div>
  );
};
