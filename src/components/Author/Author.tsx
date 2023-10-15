import Image from 'next/image';

export default function Author() {
  return (
    <div className="flex lg:flex-row items-center justify-center gap-2">
      <Image
        src={'/profile.png'}
        alt="profile"
        width={48}
        height={48}
        className="rounded-full p-1 !my-0"
      />
      <span className="text-sm lg:text-base font-semibold text-black dark:text-white">
        Woongsnote
      </span>
    </div>
  );
}
