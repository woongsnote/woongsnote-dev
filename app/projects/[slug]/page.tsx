import type { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import DetailContainer from "app/layouts/DetailContainer";
import ProjectDetailHeader from "app/layouts/ProjectDetailHeader";
import Utterance from "app/components/Utterance";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = allProjects.find((project) => project.slug === params.slug);
  return { title: project?.title };
}

const ProjectDetail = ({ params }: { params: { slug: string } }) => {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) notFound();

  const Content = useMDXComponent(project.body.code);

  return (
    <>
      <ProjectDetailHeader project={project} />
      <DetailContainer>
        <Content />
      </DetailContainer>
      <Utterance />
    </>
  );
};

export default ProjectDetail;
