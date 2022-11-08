import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full fixed z-50 border-b-2 shadow-sm">
      <div className="flex justify-between p-1 bg-white  px-2 container mx-auto">
        <Link href="/">
          <span className="text-xl font-bold">Woongsnote</span>
        </Link>
        <div className="flex gap-4">
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link href="/about">
                  <span className="text-xl font-bold">about</span>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <span className="text-xl font-bold">projects</span>
                </Link>
              </li>
            </ul>
          </nav>

          <span className="text-xl font-bold">dark</span>
        </div>
      </div>
    </header>
  );
}
