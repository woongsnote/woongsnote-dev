'use client';

import { ThemeProvider } from 'next-themes';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="data-theme" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
};
