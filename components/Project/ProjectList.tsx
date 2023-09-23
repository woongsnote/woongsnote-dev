import { Project } from 'contentlayer/generated';
import { Card as ProjetCard } from '@/components';

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-x-8 gap-y-4 pt-6">
      {projects.map((project) => (
        <ProjetCard
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
