import { Project } from 'contentlayer/generated';
import { Card } from '../Card';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 pt-6">
      {projects.map((project) => (
        <Card
          key={project._id}
          slug={`/projects/${project.slug}`}
          title={project.title}
          description={project.description}
          coverImage={project.coverImage}
          tags={project.tags}
        />
      ))}
    </div>
  );
}
