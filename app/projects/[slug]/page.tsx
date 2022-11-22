import { use } from "react";
import { ParsedUrlQuery } from "querystring";
import ProjectHeader from "./ProjectHeader";
import { getProjectBySlug, getProjects } from "../../../lib/projects";

interface Params extends ParsedUrlQuery {
  slug: string;
}
type Props = {
  params: Params;
};

const getInitialProject = async (slug: string) => {
  const project = getProjectBySlug(slug);
  return project;
};

export default function ProjectDetail({ params }: Props) {
  const project = use(getInitialProject(params.slug));
  return (
    <div className="w-full m-auto">
      <ProjectHeader project={project} />
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: project.content }} />;
      </article>
    </div>
  );
}

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
