"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiFillHome,
  AiFillEdit,
  AiFillDatabase,
  AiOutlineGithub,
} from "react-icons/ai";

const links = [
  { label: "Home", href: "/", icon: <AiFillHome /> },
  { label: "Blog", href: "/blog", icon: <AiFillEdit /> },
  { label: "Projects", href: "/projects", icon: <AiFillDatabase /> },
];

const BottomNav = () => {
  const pathname = usePathname();
  return (
    <>
      <footer className="text-black-400 w-full h-10 fixed bottom-14 md:bottom-0 bg-white md:border-t ">
        <div className="container px-5 pt-2 mx-auto flex flex-row max-w-screen-md items-center gap-5 justify-center">
          <p>
            © 2022.
            <span className="text-md text-black font-bold"> 문지웅 </span>
            All rights reserved.
          </p>
          <a href="https://github.com/woongsnote/">
            <AiOutlineGithub size={24} />
          </a>
        </div>
      </footer>
      <div className="sm:hidden">
        <nav className="fixed bottom-0 w-full border-t bg-white text-black">
          <div className="mx-auto flex h-14 max-w-md items-center justify-around">
            {links.map(({ label, href, icon }) => (
              <Link
                key={label}
                href={href}
                className={`text-sm w-full h-full flex flex-col items-center justify-center ${
                  pathname === href
                    ? "text-indigo-500 dark:text-indigo-400 "
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                }`}
              >
                <span className="text-lg py-1">{icon}</span>
                <span className="text-xs">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};
export default BottomNav;
