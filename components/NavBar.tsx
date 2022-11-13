import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          {/* <Link href="/about">
            <span className="text-xl font-bold">about</span>
          </Link> */}
        </li>
        <li>
          <Link href="/blog">
            <span className="text-xl font-bold">blog</span>
          </Link>
        </li>
        <li>
          <Link href="/projects">
            <span className="text-xl font-bold">projects</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
