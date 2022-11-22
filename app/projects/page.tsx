import { use } from "react";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../../lib/projects";

async function getInitialProjects() {
  const fileNames = getProjects();
  return fileNames;
}

export default function Page() {
  const projects = use(getInitialProjects());
  return (
    <>
      <Header />
      <div className="grid sm:grid-cols-2 gap-y-10 gap-x-6 xl:gap-x-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </>
  );
}
