import { ThemeSwitcher } from '@/app/ui/layout/ThemeSwitcher';

export const Footer = () => {
  return (
    <footer className="w-full py-4 bg-white dark:bg-darkBlack text-start flex items-center justify-between px-4">
      <div className="container mx-auto justify-between items-center flex border-t p-2">
        <p className="text-xs">© 2023. Woongsnote All rights reserved.</p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
};
