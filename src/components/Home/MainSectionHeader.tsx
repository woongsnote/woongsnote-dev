import Link from 'next/link';
import { BsArrowUpRight } from 'react-icons/bs';

type THeaderProps = {
  title: string;
  href: string;
  label: string;
};

export default function MainSectionHeader({
  title,
  href,
  label,
}: THeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center my-4 font-semibold px-2 lg:px-0">
      <h2 className="text-xl lg:text-3xl">{title}</h2>
      <Link
        aria-label={label !== '' ? `go to ${label} page` : 'home'}
        href={href}
        className="hover:text-primary hover:dark:text-secondary flex flex-row gap-2 items-center hover:border-b hover:border-primary hover:dark:border-secondary text-base lg:text-xl"
      >
        {label}
        <BsArrowUpRight />
      </Link>
    </div>
  );
}
