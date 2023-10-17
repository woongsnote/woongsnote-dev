import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Links } from './Links';

export default function NavBar() {
  const pathname = usePathname();

  const navLinks = Links.filter((link) => link.label !== '');

  return (
    <nav className="hidden sm:flex items-center justify-end justify-self-end px-4 py-2 rounded-full border-2 shadow-sm">
      {navLinks.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={`text-lg lg:text-2xl hover:underline hover:underline-offset-8 col-span-1 text-center px-2 ${
            pathname === href
              ? 'text-primary dark:text-secondary font-bold'
              : 'text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-secondary'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
