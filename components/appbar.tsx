import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { label: "blog", href: "/posts" },
  { label: "projects", href: "/projects" },
];

const AppBar = () => {
  const router = useRouter();

  return (
    <div className="w-full fixed z-20 shadow-sm top-0 left-0 bg-zinc-900">
      <header className="border-b bg-zinc-100">
        <div className="flex sm:justify-between  items-center max-w-screen-md  mx-auto py-1 px-4 md:px-0">
          <Link href="/">
            <h1 className="text-xl font-bold text-center">Woongsnote</h1>
          </Link>
          <nav className="flex items-center">
            <ul className="hidden sm:flex gap-4">
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`text-md w-12 ${
                    router.pathname === href
                      ? "text-indigo-500 dark:text-indigo-400 font-bold"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default AppBar;
