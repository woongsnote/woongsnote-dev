const DetailContainer = ({ children }: { children: React.ReactNode }) => {
  return <article className="prose dark:prose-invert lg:prose-xl mx-auto">{children}</article>;
};

export default DetailContainer;
