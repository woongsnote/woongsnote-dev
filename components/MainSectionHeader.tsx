import Link from "next/link";

interface HeaderProps {
  title: string;
  href: string;
  label: string;
}

const MainSectionHeader = ({ title, href, label }: HeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <h2 className="text-2xl my-4 font-bold">{title}</h2>
      <Link
        aria-label={`go to ${label} page`}
        href={href}
        className="text-lg lg:text-2xl text-indigo-500 dark:text-indigo-400 font-bold">
        {label}
      </Link>
    </div>
  );
};

export default MainSectionHeader;
