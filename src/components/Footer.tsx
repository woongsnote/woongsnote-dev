import { ThemeSwitcher } from '@/components';

const Footer = () => {
  return (
    <footer className="w-full left-0 right-0 bottom-14 py-4 md:bottom-0 bg-gray-50 dark:bg-darkBlack text-start flex items-center justify-between px-2 lg:px-4">
      <div className="container mx-auto justify-between items-center flex">
        <p className="text-xs">© 2023. Woongsnote All rights reserved.</p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default Footer;
