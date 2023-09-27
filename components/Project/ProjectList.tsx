import { Project } from 'contentlayer/generated';
import { Card as ProjetCard } from '@/components';

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project._id}>
          <ProjetCard
            slug={`/projects/${project.slug}`}
            title={project.title}
            description={project.description}
            coverImage={project.coverImage}
            tags={project.tags}
            readingTimeText={project.readingTime.text}
            date={project.date}
          />
        </li>
      ))}
    </ul>
  );
}
