import Link from 'next/link';
import Image from 'next/image';
const Title = 'Woongsnote';

export default function Logo() {
  return (
    <Link href="/" className="flex flex-row space-x-2 items-center">
      <Image
        width={48}
        height={48}
        src={'/icons/icon-144x144.png'}
        alt="logo"
        className="rounded-full"
      />
    </Link>
  );
}
