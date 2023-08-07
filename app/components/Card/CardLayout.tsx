import { ReactNode } from 'react';

const CardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <article className="hover:text-indigo-500 shadow-md rounded-lg dark:border-2 dark:border-gray-500 md:group-hover:scale-105 transition-transform duration-200 ease-out flex flex-col justify-center overflow-hidden">
      {children}
    </article>
  );
};

export default CardLayout;
