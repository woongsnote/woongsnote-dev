interface DetailLayoutProps {
  children: React.ReactElement
}

const DetailLayout = ({ children }:DetailLayoutProps ) => {
  return (
    <article className="prose dark:prose-invert lg:prose-xl mx-auto mb-4">
      {children}
    </article>
  );
};

export default DetailLayout;
