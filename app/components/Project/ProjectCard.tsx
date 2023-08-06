import Link from 'next/link';
import Image from 'next/image';
import { Project } from 'contentlayer/generated';
import TagItem from '../TagItem';

const ProjectCard = ({
  slug,
  coverImage,
  title,
  description,
  tags,
}: Project): React.ReactElement => {
  return (
    <Link
      href={`/projects/${slug}`}
      className="overflow-hidden shadow-md rounded-lg border md:hover:scale-105 transition duration-200"
    >
      <article className="flex flex-col">
        <Image
          src={coverImage}
          alt={title}
          priority
          width={600}
          height={600}
          className="h-72 object-fit"
        />
        <h3 className="pl-2 pt-1 border-t font-semibold">{title}</h3>
        <p className="pl-2 text-sm">{description}</p>
        <div className="flex flex-row gap-2 p-2">
          {tags?.map((tag) => <TagItem key={tag.title} title={tag.title} />)}
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
