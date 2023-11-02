import { ThemeSwitcher } from '@/app/ui/layout/ThemeSwitcher';

export const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-between bg-bkg px-2 py-4 text-start">
      <div className="container mx-auto flex items-center justify-between border-t p-2">
        <p className="text-xs">© 2023. Woongsnote All rights reserved.</p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
};
