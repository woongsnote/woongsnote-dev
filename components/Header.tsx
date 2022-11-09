import React from "react";
import Link from "next/link";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="w-full fixed z-50  shadow-sm">
      <div className="flex justify-between p-1 bg-white items-center max-w-screen-md px-5 container mx-auto">
        <Link href="/">
          <span className="text-xl font-bold">Woongsnote</span>
        </Link>

        <NavBar />
      </div>
    </header>
  );
}
