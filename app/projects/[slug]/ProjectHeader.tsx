import { FunctionComponent } from "react";
import Image from "next/image";
import { Project } from "../../../interfaces/Project";

type Props = {
  project: Project;
};

const ProjectHeader: FunctionComponent<Props> = ({ project }) => {
  return (
    <div>
      <div className="flex flex-row justify-between mb-2">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="relative h-10 w-10 !mb-0">
              <Image
                priority
                fill
                className="rounded-full"
                src={project.authorImage}
                alt=""
              />
            </div>
          </div>
          <div className="ml-3">
            <span className="text-sm font-medium text-gray-900 !mb-0">
              {project.author}
            </span>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={project.date}>{project.date}</time>
            </div>
          </div>
        </div>
      </div>
      <h1 className="font-bold text-3xl md:text-4xl mb-1">{project.title}</h1>
      <h2 className="blog-detail-header-subtitle mb-2 text-md md:text-xl tsext-gray-600">
        {project.description}
      </h2>
      <div className="h-96 bg-black mx-auto w-full relative rounded-xl">
        <Image
          priority
          fill
          className="rounded-xl shadow-lg object-center"
          src={project.coverImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProjectHeader;
