import Image from 'next/image';
import { SocialLinks } from '@/components';

export function Profile() {
  return (
    <div className="flex flex-row gap-6 items-center lg:justify-start p-2 h-fit w-full lg:p-8 mx-auto border-b">
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
      <div className="flex flex-col gap-2 text-start">
        <h3 className="text-lg font-bold">
          문 지 웅 <span className="text-base"> @woongsnote </span>
        </h3>
        <span>Frontend Developer</span>
        <p className="text-sm">새로운 기술을 학습하는 것을 즐깁니다.</p>
        <SocialLinks />
      </div>
    </div>
  );
}
