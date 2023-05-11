import type { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Container from "components/Container";
import ProjectDetailHeader from "components/ProjectDetailHeader";
import Utterance from "components/Utterance";
import DetailContainer from "components/DetailContainer";

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
    <Container>
      <ProjectDetailHeader project={project} />
      <DetailContainer>
        <Content />
      </DetailContainer>
      <Utterance />
    </Container>
  );
};

export default ProjectDetail;
