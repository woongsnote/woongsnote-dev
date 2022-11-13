import Link from "next/link";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="w-full fixed z-50 shadow-sm">
      <div className="flex justify-between bg-white items-center max-w-screen-md container mx-auto py-1 px-2 md:px-0">
        <Link href="/">
          <span className="text-xl font-bold">Woongsnote</span>
        </Link>

        <NavBar />
      </div>
    </header>
  );
}
