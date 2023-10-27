import { ThemeSwitcher } from '@/app/ui/layout/ThemeSwitcher';

export const Footer = () => {
  return (
    <footer className="w-full left-0 right-0 py-4 bottom-0 bg-white dark:bg-darkBlack text-start flex items-center justify-between px-4 border-t">
      <div className="container mx-auto justify-between items-center flex">
        <p className="text-xs">© 2023. Woongsnote All rights reserved.</p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
};
