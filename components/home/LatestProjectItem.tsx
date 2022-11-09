import React from "react";
import { MyProject } from "../../types";
import Link from "next/link";
import Image from "next/image";

export default function LatestProjectItem({
  imageUrl,
  title,
  description,
}: MyProject) {
  return (
    <Link
      href="/detail"
      className="group h-48 md:h-64 xl:h-96 flex flex-col bg-gray-100 rounded-lg shadow-lg overflow-hidden relative"
    >
      <Image
        width={600}
        height={100}
        src={imageUrl}
        loading="lazy"
        alt="Post Info"
        className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
      />
      <div className="bg-gradient-to-t from-gray-800 md:via-transparent to-transparent absolute inset-0 pointer-events-none"></div>
      <div className="relative p-4 mt-auto">
        <span className="block text-gray-200 text-sm">{description}</span>
        <h2 className="text-white text-xl font-semibold transition duration-100 mb-2">
          {title}
        </h2>

        <span className="text-indigo-300 font-semibold">Read more</span>
      </div>
    </Link>
  );
}
