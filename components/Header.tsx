'use client'
import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import NavBar from "./NavBar";

const Header=()=> {
  return (
    <header className="sticky left-0 top-0 right-0 z-50 max-w-5xl items-center mx-auto bg-white dark:bg-[#111111]">
      <div className="flex justify-between items-center py-1 w-full mx-auto  ">
        <Link href="/" className="flex flex-row space-x-2 items-center">
          <Image
            width={40}
            height={40}
            src="https://avatars.githubusercontent.com/u/83802168?v=4"
            alt="프로필이미지"
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-center">Woongsnote</h1>
        </Link>
        <div className="flex items-center justify-between">
          <NavBar />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
export default Header;