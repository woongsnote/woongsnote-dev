import Image from 'next/image';
import { SocialLinks } from '@/components';

export default function HeroSection() {
  return (
    <section className="flex flex-row text-center items-center justify-center w-full gap-8 border-b py-8">
      <div className="w-32 border-4 flex items-center justify-center border-double rounded-full">
        <Image
          src={'/profile.png'}
          alt="profile"
          priority
          width={300}
          height={300}
          className="w-auto h-auto object-cover rounded-full"
        />
      </div>
      <div className="text-start flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold">Woong&acute;s Tech Blog</h1>
        <p className="text-sm md:text-xl text-gray-500 mt-2">
          학습한 지식들을 기록하고 공유하기 위한 공간입니다.
        </p>
        <SocialLinks />
      </div>
    </section>
  );
}
