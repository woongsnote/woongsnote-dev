import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex flex-row space-x-2 items-center">
      <span className="text-lg lg:text-2xl font-bold">Woongsnote</span>
    </Link>
  );
}
