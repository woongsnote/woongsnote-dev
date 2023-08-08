interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({
  title,
  description,
}: PageHeaderProps): React.ReactElement => {
  return (
    <div className="mt-2 md:mt-0">
      <h1 className="text-3xl font-bold md:pt-2">{title}</h1>
      <p className="mt-2 text-md mb-2">{description}</p>
    </div>
  );
};

export default PageHeader;
