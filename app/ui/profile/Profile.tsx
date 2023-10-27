import Image from 'next/image';
import { SocialLinks } from '@/app/ui/profile';

export const Profile = () => {
  return (
    <section className="flex gap-8 items-center justify-center container mx-auto h-full absolute p-4 flex-col inset-0">
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="w-48 border-4 flex items-center justify-center rounded-full col-span-3 lg:col-span-2">
          <Image
            src={'/profile.png'}
            alt="profile"
            priority
            width={300}
            height={300}
            className="w-auto h-auto object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h3 className="font-black text-3xl "> @woongsnote </h3>
        <span>Frontend Developer</span>
        <p className="text-base lg:text-lg">
          안녕하세요. <span className="font-bold">문지웅</span>입니다. <br />
          새로운 기술을 학습하는 것을 좋아합니다.
        </p>
      </div>
      <SocialLinks />
    </section>
  );
};
