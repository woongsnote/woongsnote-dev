'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Links } from './NavBar/Links';

const BottomNav = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="sm:hidden">
        <nav className="fixed bottom-0 w-full border-t">
          <div className="mx-auto flex h-14 items-center justify-around bg-white dark:bg-black">
            {Links.map(({ bottomLabel, href, icon }) => (
              <Link
                key={bottomLabel}
                href={href}
                className={`text-sm w-full h-full flex flex-col items-center justify-center ${
                  pathname === href
                    ? 'text-indigo-500 dark:text-indigo-400 '
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                }`}
              >
                <span className="text-lg py-1">{icon}</span>
                <span className="text-xs">{bottomLabel}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};
export default BottomNav;
