import { Project } from "contentlayer/generated";
import Image from "next/image";

interface ProjectDetailHeaderProps {
    project: Project 
}

const ProjectDetailHeader = ({ project }: ProjectDetailHeaderProps) => {
  return (
    <div className="py-2 mb-8 md:mx-24">
      <h1 className="text-3xl md:text-5xl font-bold mb-1">{project.title}</h1>
      <h2 className="mb-2 text-md md:text-lg text-gray-700 dark:text-gray-300">
        {project.description}
      </h2>
      <div className="max-h-72 h-auto mx-auto w-full relative rounded-xl items-center block justify-center">
        <Image
          src={project.coverImage}
          alt="coverImage"
          priority
          width={300}
          height={200}
          className="rounded-md w-auto h-auto object-contain mx-auto my-6"
        />
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
