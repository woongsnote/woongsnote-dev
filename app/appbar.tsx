import Link from "next/link";

const links = [
  { label: "blog", href: "/blogs" },
  { label: "projects", href: "/projects" },
];

const AppBar = () => {
  return (
    <div className="w-full fixed z-20 shadow-sm top-0 left-0">
      <header className="border-b">
        <div className="flex sm:justify-between  items-center max-w-screen-md  mx-auto py-1 px-4 md:px-0">
          <Link href="/">
            <h1 className="text-xl font-bold text-center">Woongsnote</h1>
          </Link>
          <nav className="flex items-center">
            <ul className="hidden sm:flex gap-4">
              {links.map(({ label, href }) => (
                <Link key={label} href={href} className={`text-md w-12 `}>
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
