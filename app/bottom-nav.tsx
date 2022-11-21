import Link from "next/link";
import { AiFillHome, AiFillEdit, AiFillDatabase } from "react-icons/ai";

const links = [
  { label: "Home", href: "/", icon: <AiFillHome /> },
  { label: "Blog", href: "/blogs", icon: <AiFillEdit /> },
  { label: "Projects", href: "/projects", icon: <AiFillDatabase /> },
];

const BottomNav = () => {
  return (
    <>
      <footer className="text-black-400 w-full h-10 fixed bottom-14 md:bottom-0  md:border-t">
        <div className="container px-5 pt-2 mx-auto flex  sm:flex-row flex-col max-w-screen-md ">
          <span className="text-md text-black">
            © 2022. woongsnote All rights reserved.
          </span>
        </div>
      </footer>
      <div className="sm:hidden">
        <nav className="fixed bottom-0 w-full border-t bg-zinc-100">
          <div className="mx-auto flex h-14 max-w-md items-center justify-around">
            {links.map(({ label, href, icon }) => (
              <Link
                key={label}
                href={href}
                className={`text-sm w-full h-full flex flex-col items-center justify-center `}
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
