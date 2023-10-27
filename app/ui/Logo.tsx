import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="text-lg lg:text-2xl font-bold col-span-1 w-fit">
      {`woongsnote.dev`}
    </Link>
  );
};

export default Logo;
