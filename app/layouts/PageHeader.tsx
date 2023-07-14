interface PageProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageProps): React.ReactElement => {
  return (
    <div className="mt-2 md:mt-0">
      <h2 className="text-3xl font-bold md:pt-2">{title}</h2>
      <p className="mt-2 text-md mb-2">{description}</p>
    </div>
  );
};

export default PageHeader;
