import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const links = [
  
  // { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className={`${inter.variable} font-sans flex items-center mx-auto justify-between space-x-2 px-2 font-bold w-full max-w-5xl fixed top-0 left-0 right-0 z-20 bg-white dark:bg-black`}>
      <div className="flex justify-between items-center py-1 w-full mx-auto ">
        <Link href="/" className="flex flex-row space-x-2 items-center">
        <Image
          width={48}
          height={48}
          src="/profileImage.jpg"
          alt="프로필이미지"
          className="rounded-full"
        />
          <h1 className="text-2xl font-bold text-center">Woongsnote</h1>
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
