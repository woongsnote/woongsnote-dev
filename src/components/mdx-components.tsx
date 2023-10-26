import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';

const components = {
  Image,
};

type MDXProps = {
  code: string;
};

const MDXComponents = ({ code }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
};

export default MDXComponents;
