import { NextPage } from "next";
import Page from "../../components/page";
import Title from "../../components/page/title";
import ProjectItem from "../../components/projects/project";
import { getProjects } from "../api/get-projects";

export async function getStaticProps() {
  let { results } = await getProjects();
  return {
    props: {
      projects: results,
    },
  };
}
interface Props {
  projects: [any];
}

const Projects: NextPage<Props> = ({ projects }) => {
  return (
    <Page>
      <Title
        pageTitle="Projects"
        pageDescription="사이드&토이 프로젝트를 기록합니다"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 xl:gap-8">
        {projects &&
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              title={project.properties.Title.title[0].plain_text}
              imageUrl={
                project.cover.external
                  ? project.cover.external.url
                  : project.cover.file.url
              }
              description={
                project.properties.Description.rich_text[0]?.plain_text
              }
              slug={project.properties.slug.rich_text[0]?.plain_text}
            />
          ))}
      </div>
    </Page>
  );
};
export default Projects;
