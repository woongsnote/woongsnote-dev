type PageHeaderProps = {
  title: string;
  description: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <section className="container mt-1 flex flex-col items-center justify-center rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-10 text-white xl:mx-auto">
      <h2 className="w-full text-3xl font-black lg:text-5xl">{title}</h2>
      <p className="w-full">{description}</p>
    </section>
  );
};
