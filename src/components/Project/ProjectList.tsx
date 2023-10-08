import { Project } from 'contentlayer/generated';
import { Card as ProjetCard } from '@/components';

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 px-4 lg:px-0">
      {projects.map((project) => (
        <ProjetCard
          key={project._id}
          slug={`/projects/${project.slug}`}
          title={project.title}
          description={project.description}
          coverImage={project.coverImage}
          tags={project.tags}
          readingTimeText={project.readingTime.text}
          date={project.date}
        />
      ))}
    </div>
  );
}
