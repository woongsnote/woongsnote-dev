import { ProfileImage } from '@/app/ui/profile';

export const Profile = () => {
  return (
    <section className="flex gap-8 items-center w-full mx-auto h-full p-4 flex-col lg:p-10 lg:flex-row lg:justify-center self-start">
      <ProfileImage />
      <div className="flex flex-col gap-2 text-start items-center lg:gap-7">
        <h3 className="font-black text-3xl "> @woongsnote </h3>
        <span>Frontend Developer</span>
        <p className="text-lg lg:text-xl">
          안녕하세요. 프론트엔드 개발자{' '}
          <span className="font-bold">문지웅</span>입니다. <br />
          <b>새로운 기술</b>을 학습하고 적용하는 것을 즐깁니다. <br />
          최근에는 <b>Next.js</b>를 학습하고 있습니다.
        </p>
      </div>
    </section>
  );
};
