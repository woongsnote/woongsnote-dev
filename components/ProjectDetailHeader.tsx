import { Project } from "@/.contentlayer/generated";
import Image from "next/image";

const ProjectDetailHeader = ({ project }: { project: Project }) => {
  return (
    <div className="py-2 mb-8">
      <h1 className="text-5xl font-bold mb-1">{project.title}</h1>
      <h2 className="mb-2 text-md md:text-lg text-gray-700 dark:text-gray-300">
        {project.description}
      </h2>
      <div className="h-96 mx-auto w-3/4 relative rounded-xl">
        <Image
          src={project.coverImage}
          alt="coverImage"
          priority
          fill
          className="rounded-md w-auto h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
