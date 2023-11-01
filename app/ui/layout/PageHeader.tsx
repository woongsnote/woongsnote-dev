type PageHeaderProps = {
  title: string;
  description: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <section className="py-10 container flex flex-col px-4 bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary text-white items-center mt-1 xl:mx-auto rounded-md justify-center">
      <h2 className="font-black text-3xl lg:text-5xl w-full">{title}</h2>
      <p className="w-full">{description}</p>
    </section>
  );
};
