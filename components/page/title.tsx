interface props {
  pageTitle: string;
  pageDescription: string;
}

const Title = ({ pageTitle, pageDescription }: props) => {
  return (
    <div className="my-4">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
      <p className="my-2">{pageDescription}</p>
    </div>
  );
};

export default Title;
