import Link from "next/link";
import { usePathname } from "next/navigation";
import { Links } from "./Links";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center">
      <ul className="hidden sm:flex gap-4">
        {Links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`text-lg lg:text-2xl ${
                pathname === href
                  ? "text-indigo-500 dark:text-indigo-400 font-bold"
                  : "text-zinc-600 hover:text-indigo-500 dark:text-zinc-400 dark:hover:text-indigo-400"
              }`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
