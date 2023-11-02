import { ProfileImage } from '@/app/ui/profile';

export const Profile = () => {
  return (
    <section className="mx-auto flex h-full w-full flex-col items-center gap-8 self-start p-4 lg:flex-row lg:justify-center lg:p-10">
      <ProfileImage />
      <div className="flex flex-col items-center gap-2 text-start lg:gap-7">
        <div className="text-center">
          <h3 className="text-3xl font-black"> @woongsnote </h3>
          <span>Frontend Developer</span>
        </div>

        <p className="text-lg lg:text-xl">
          안녕하세요. 프론트엔드 개발자 <b>문지웅</b>입니다. <br />
          <b>새로운 기술</b>을 학습하고 적용하는 것을 즐깁니다. <br />
          최근에는 <b>Next.js</b>를 학습하고 있습니다.
        </p>
      </div>
    </section>
  );
};
