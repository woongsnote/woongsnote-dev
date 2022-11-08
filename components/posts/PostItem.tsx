import Link from "next/link";
import React from "react";
import { MyPost } from "../../types";
import Image from "next/image";

export default function PostItem() {
  return (
    <Link
      href="/detail"
      className="group h-48 md:h-64 xl:h-96 flex flex-col bg-gray-100 rounded-lg shadow-lg overflow-hidden relative"
    >
      <Image
        width={600}
        height={100}
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
        loading="lazy"
        alt="Photo by Minh Pham"
        className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
      />
      <div className="bg-gradient-to-t from-gray-800 md:via-transparent to-transparent absolute inset-0 pointer-events-none"></div>
      <div className="relative p-4 mt-auto">
        <span className="block text-gray-200 text-sm">July 19, 2021</span>
        <h2 className="text-white text-xl font-semibold transition duration-100 mb-2">
          New trends in Tech
        </h2>

        <span className="text-indigo-300 font-semibold">Read more</span>
      </div>
    </Link>
  );
}
