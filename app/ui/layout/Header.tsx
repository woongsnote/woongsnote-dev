import Logo from '@/app/ui/Logo';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 items-center bg-white dark:bg-darkBlack w-full px-2 py-2 shadow-sm">
      <div className="container mx-auto justify-between flex">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
};
