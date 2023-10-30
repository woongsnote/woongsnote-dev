import Image from 'next/image';
import profileImage from '@/public/profile.png';
export const ProfileImage = () => {
  return (
    <div className="w-48 h-48 flex items-center justify-center overflow-hidden rounded-full col-span-3 lg:col-span-2 lg:w-64 lg:h-64 relative">
      <Image
        src={profileImage}
        alt="profile"
        priority
        width={300}
        height={300}
        className="w-full h-full absolute object-cover rounded-full"
        quality={100}
        placeholder="blur"
      />
    </div>
  );
};
