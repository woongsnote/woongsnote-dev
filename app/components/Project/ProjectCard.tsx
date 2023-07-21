import Link from 'next/link';
import Image from 'next/image';
import { Project } from 'contentlayer/generated';

const ProjectCard = ({
  slug,
  coverImage,
  title,
  description,
}: Project): React.ReactElement => {
  return (
    <Link
      href={`/projects/${slug}`}
      className="card relative h-64 rounded-lg overflow-hidden shadow-md hover:scale-105"
    >
      <Image
        width={600}
        height={100}
        src={coverImage}
        priority
        alt="Project Description"
        className="object-cover overflow-hidden"
      />
      <div className="card-content absolute bottom-0 left-0 p-4 w-full bg-black bg-opacity-60 text-white rounded-b-lg">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-1">{description}</p>
      </div>
    </Link>
    
  );
};

export default ProjectCard;
