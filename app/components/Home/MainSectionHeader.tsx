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
        className="text-lg lg:text-2xl hover:text-primary hover:dark:text-secondary font-bold flex gap-2 items-center hover:underline hover:underline-offset-4"
      >
        {label}
      </Link>
    </div>
  );
}
