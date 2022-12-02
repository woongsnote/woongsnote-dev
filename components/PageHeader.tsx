interface PageProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageProps) => {
  return (
    <section className="mb-2 border-b-2 pb-2">
      <h2 className="text-3xl font-bold py-2">{title}</h2>
      <p className="py-2 text-md">{description}</p>
    </section>
  );
};

export default PageHeader;
