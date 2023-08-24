export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="hover:text-indigo-500 shadow-md rounded-lg dark:border-2 dark:border-white md:group-hover:scale-105 transition-transform duration-200 ease-out flex flex-col justify-center">
      {children}
    </article>
  );
}
