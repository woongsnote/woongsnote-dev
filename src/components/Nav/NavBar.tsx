import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Links } from './Links';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center mx-2">
      <ul className="hidden md:flex gap-4">
        {Links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`text-lg lg:text-2xl hover:underline hover:underline-offset-8 ${
                pathname === href
                  ? 'text-primary dark:text-secondary font-bold'
                  : 'text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-secondary'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
