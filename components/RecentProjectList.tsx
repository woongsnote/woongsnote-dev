import { Project } from "contentlayer/generated";
import ProjectCard from "./ProjectCard";
import MainSectionHeader from "./MainSectionHeader";

const RecentProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="mx-auto mt-10">
      <MainSectionHeader title={"최신 프로젝트"} href={"/projects"} label={"ALL PROJECTS"} />
      <hr />
      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 pt-6">
        {projects.slice(0, 2).map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default RecentProjectList;
