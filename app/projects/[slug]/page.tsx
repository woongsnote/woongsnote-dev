import { NextPage } from "next";
import { use } from "react";
import { ParsedUrlQuery } from "querystring";
import { getProjectBySlug, getProjects } from "../../../lib/projects";
import ProjectHeader from "./ProjectHeader";
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

const ProjectDetail: NextPage<Props> = ({ params }) => {
  const project = use(getInitialProject(params.slug));
  return (
    <div className="w-full m-auto py-2">
      <ProjectHeader project={project} />
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </article>
    </div>
  );
};

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default ProjectDetail;
