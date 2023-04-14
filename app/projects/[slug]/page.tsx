import type { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allProjects } from "@/.contentlayer/generated";
import Container from "@/components/Container";
import ProjectDetailHeader from "@/components/ProjectDetailHeader";
import Utterance from "@/components/Utterance";

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

  const Content = useMDXComponent(project!!.body.code);

  return (
    <Container>
      <ProjectDetailHeader project={project!!} />
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <Content />
      </article>
      <Utterance />
    </Container>
  );
};

export default ProjectDetail;
