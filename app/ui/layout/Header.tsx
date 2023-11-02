import Logo from '@/app/ui/Logo';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 w-full items-center px-2 py-2 shadow-sm bg-bkg">
      <div className="container mx-auto flex justify-between bg-bkg ">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
};
