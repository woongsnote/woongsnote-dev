import PageHeader from "components/PageHeader";
import { allProjects, Project } from "contentlayer/generated";
import ProjectCard from "components/ProjectCard";
import { InferGetStaticPropsType } from "next";

export async function getStaticProps() {
  const projects = allProjects.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return {
    props: {
      projects,
    },
  };
}
const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageHeader
        title="Projects"
        description="사이드 & 토이 프로젝트들을 기록합니다."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: Project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </>
  );
};

export default Projects;
