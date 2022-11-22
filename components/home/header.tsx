import Link from "next/link";
import { SectionHead } from "../../types";

const SectionHeader = ({ title, linkTitle, linkAddress }: SectionHead) => {
  return (
    <div className="flex justify-between px-2 items-center border-b">
      <h2 className="text-lg font-bold py-2">{title}</h2>
      <Link
        href={linkAddress}
        className="text-black text-center text-lg p-1 px-2 hover:bg-indigo-500 hover:text-white rounded-lg"
      >
        {linkTitle}
      </Link>
    </div>
  );
};

export default SectionHeader;
