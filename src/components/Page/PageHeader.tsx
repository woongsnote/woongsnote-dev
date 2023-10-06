type TPageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: TPageHeaderProps) {
  return (
    <div className="mt-2 md:mt-0 px-2">
      <h1 className="text-3xl font-bold md:pt-2">{title}</h1>
      <p className="mt-2 text-md mb-2">{description}</p>
    </div>
  );
}
