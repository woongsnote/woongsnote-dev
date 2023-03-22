import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

const links = [
  { label: "blog", href: "/blog" },
  { label: "projects", href: "/projects" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full fixed z-20 shadow-sm top-0 left-0 bg-white dark:bg-black">
      <div className="border-b ">
        <div className="flex justify-between  items-center max-w-screen-lg mx-auto py-1">
          <Link href="/">
            <h1 className="text-3xl font-bold text-center ml-2">Woongsnote</h1>
          </Link>
          <nav className="flex items-center justify-center">
            <ul className="hidden sm:flex gap-4">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`text-lg ${
                      pathname === href
                        ? "text-indigo-500 dark:text-indigo-400 font-bold"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    }`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeSwitch />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
