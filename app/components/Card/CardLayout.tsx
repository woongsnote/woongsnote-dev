export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="hover:text-primary hover:shadow-xl border-2 rounded-lg md:group-hover:scale-105 transition-transform duration-200 ease-out flex flex-col justify-center">
      {children}
    </article>
  );
}
