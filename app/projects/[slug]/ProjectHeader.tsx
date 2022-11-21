import { FunctionComponent } from "react";
import Image from "next/image";
import { Project } from "../../../interfaces/Project";

type Props = {
  project: Project;
};

const ProjectHeader: FunctionComponent<Props> = ({ project }) => {
  return (
    <div className="project-detail-header">
      <div className="flex flex-row justify-between mb-2">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a href="#">
              <span className="sr-only">{project.author}</span>
              <div className="relative h-10 w-10 !mb-0">
                <Image
                  priority
                  fill
                  className="rounded-full object-cover"
                  src={project.authorImage}
                  alt=""
                />
              </div>
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 !mb-0">
              <a href="#" className="hover:underline">
                {project.author}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={project.date}>{project.date}</time>
            </div>
          </div>
        </div>
        <div className="flex self-end">{/* Social Links Here */}</div>
      </div>
      <h1 className="font-bold text-4xl mb-1">{project.title}</h1>
      <h2 className="blog-detail-header-subtitle mb-2 text-xl text-gray-600">
        {project.description}
      </h2>
      <div className="h-96 bg-black mx-auto w-full relative">
        <Image
          priority
          fill
          src={project.coverImage}
          alt=""
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default ProjectHeader;
