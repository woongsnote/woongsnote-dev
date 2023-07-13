'use client';

import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps): React.ReactElement => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Providers;
