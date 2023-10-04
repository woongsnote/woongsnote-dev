'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Links } from './Links';

const BottomNav = () => {
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <nav className="fixed bottom-0 w-full border-t">
        <div className="mx-auto flex h-14 items-center justify-around bg-white dark:bg-darkBlack">
          {Links.map(({ bottomLabel, href, icon }) => (
            <Link
              key={bottomLabel}
              href={href}
              className={`text-sm w-full h-full flex flex-col items-center justify-center ${
                pathname === href
                  ? 'text-primary dark:text-secondary'
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
  );
};
export default BottomNav;