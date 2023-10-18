type TPageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: TPageHeaderProps) {
  return (
    <div className="mt-2 px-2 mb-4 2xl:px-0 border-b pb-4">
      <h1 className="text-3xl lg:text-5xl font-bold md:pt-2">{title}</h1>
      <p className="mt-2 text-base mb-2">{description}</p>
    </div>
  );
}
