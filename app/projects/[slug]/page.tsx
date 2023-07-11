import { useMDXComponent } from 'next-contentlayer/hooks';
import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import DetailLayout from 'app/layouts/DetailLayout';
import ProjectDetailHeader from 'app/layouts/ProjectDetailHeader';
import Utterance from 'app/components/Utterance';

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  return allProjects.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = ({ params }: Props) => {
  const project = allProjects.find((project) => project.slug === params.slug);
  if (!project) throw new Error(`Project not found for slug: ${params.slug}`);
  return {
    title: project.title,
    description: project.description,
  };
};

const ProjectDetail = ({ params }: Props) => {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) notFound();

  const MDXContent = useMDXComponent(project.body.code);

  return (
    <>
      <ProjectDetailHeader project={project} />
      <DetailLayout>
        <MDXContent />
      </DetailLayout>
      <Utterance />
    </>
  );
};

export default ProjectDetail;
