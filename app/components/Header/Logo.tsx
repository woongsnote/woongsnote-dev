import Link from 'next/link';
import Image from 'next/image';

const Title = 'Woongsnote';

export default function Logo() {
  return (
    <Link href="/" className="flex flex-row space-x-2 items-center">
      <Image
        width={40}
        height={40}
        src={'/profile.png'}
        alt="프로필이미지"
        className="rounded-full"
      />
      <h1 className="text-2xl font-bold text-center">{Title}</h1>
    </Link>
  );
}
