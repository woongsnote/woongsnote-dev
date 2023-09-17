import Link from 'next/link';
import { BsArrowUpRight } from 'react-icons/bs';

interface HeaderProps {
  title: string;
  href: string;
  label: string;
}

export default function MainSectionHeader({ title, href, label }: HeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center mt-2">
      <h2 className="text-xl lg:text-2xl font-bold">{title}</h2>
      <Link
        aria-label={`go to ${label} page`}
        href={href}
        className="text-lg lg:text-2xl hover:text-indigo-500 hover:dark:text-indigo-400 font-bold flex gap-2 items-center border-b-2"
      >
        {label}
        <BsArrowUpRight />
      </Link>
    </div>
  );
}
