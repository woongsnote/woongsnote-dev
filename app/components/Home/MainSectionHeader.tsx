import Link from 'next/link';

interface HeaderProps {
  title: string;
  href: string;
  label: string;
}

export default function MainSectionHeader({ title, href, label }: HeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center mt-2 text-xl lg:text-2xl font-semibold">
      <h2>{title}</h2>
      <Link
        aria-label={label !== '' ? `go to ${label} page` : 'home'}
        href={href}
        className="hover:text-primary hover:dark:text-secondary flex gap-2 items-center hover:underline hover:underline-offset-4"
      >
        {label}
      </Link>
    </div>
  );
}
