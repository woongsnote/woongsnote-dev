import Image from 'next/image';
import { SocialLinks } from '@/components';

export default function Profile() {
  return (
    <div className="flex flex-row md:flex-col gap-6 items-center lg:justify-center border p-2 rounded-lg shadow-sm h-fit w-full lg:p-8">
      <div className="w-24 lg:w-32 border-4 flex items-center justify-center rounded-full col-span-3 lg:col-span-2">
        <Image
          src={'/profile.png'}
          alt="profile"
          priority
          width={300}
          height={300}
          className="w-auto h-auto object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col gap-2 lg:gap-4 text-start md:text-center">
        <h3 className="text-lg font-bold">문 지 웅</h3>
        <span>@woongsnote</span>
        <span>Frontend Developer</span>

        <div className="hidden md:block">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
