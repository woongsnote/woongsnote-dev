import { Project } from "contentlayer/generated";
import ProjectCard from "./ProjectCard";

const RecentProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="mx-auto mt-10">
      <h2 className="text-2xl pb-2 my-4 font-bold border-b">최신 프로젝트</h2>
      <div className="grid gap-y-3 gap-x-8 md:grid-cols-2">
        {projects.slice(0, 2).map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default RecentProjectList;
