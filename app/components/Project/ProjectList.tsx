import { Project } from 'contentlayer/generated';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps): React.ReactElement => {
  return (
    <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 pt-6">
      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
