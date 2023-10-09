import { Project } from 'contentlayer/generated';
import { Card as ProjetCard } from '@/components';
import Link from 'next/link';

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project._id}>
          <Link href={`projects/${project.slug}`}>
            <ProjetCard
              key={project._id}
              title={project.title}
              description={project.description}
              coverImage={project.coverImage}
              tags={project.tags}
              readingTimeText={project.readingTime.text}
              date={project.date}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
