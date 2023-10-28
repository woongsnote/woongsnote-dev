import Image from 'next/image';

export const Profile = () => {
  return (
    <section className="flex gap-8 items-center w-full mx-auto h-full p-4 flex-col lg:p-10 lg:flex-row lg:justify-center self-start">
      <div className="w-48 border-4 flex items-center justify-center rounded-full col-span-3 lg:col-span-2 lg:w-64">
        <Image
          src={'/profile.png'}
          alt="profile"
          priority
          width={300}
          height={300}
          className="w-auto h-auto object-cover rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2 text-start items-center lg:gap-7">
        <h3 className="font-black text-3xl "> @woongsnote </h3>
        <span>Frontend Developer</span>
        <p className="text-lg lg:text-xl">
          안녕하세요. 프론트엔드 개발자{' '}
          <span className="font-bold">문지웅</span>입니다. <br />
          새로운 기술을 학습하는 것을 좋아합니다.
        </p>
      </div>
    </section>
  );
};
