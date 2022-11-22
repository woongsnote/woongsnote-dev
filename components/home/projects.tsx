import SectionHeader from "./header";
import ProjectItem from "../projects/project";

interface Props {
  projects: any[];
}
const LatestProjects = ({ projects }: Props) => {
  return (
    <section className="mt-4">
      <div className="px-4 md:px-8 mx-auto">
        <SectionHeader
          title="최신 프로젝트"
          linkTitle="전체보기"
          linkAddress="/projects"
        />

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 xl:gap-8 mt-3">
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
      </div>
    </section>
  );
};

export default LatestProjects;
