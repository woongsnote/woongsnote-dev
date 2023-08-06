import { useMDXComponent } from 'next-contentlayer/hooks';
import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Props {
  params: { slug: string };
}

export const generateStaticParams = async () => {
  return allProjects.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = ({ params }: Props) => {
  const project = allProjects.find((project) => project.slug === params.slug);
  if (!project) throw new Error(`Project not found for slug: ${params.slug}`);
  const tags = project.tags?.map((tag) => tag.title).join(', ');
  return {
    title: project.title,
    description: project.description,
    keywords: tags,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.coverImage,
          width: 800,
          height: 480,
          alt: project.title,
        },
      ],
    },
  };
};

export default function ProjectPage({ params }: Props) {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) notFound();

  const MDXContent = useMDXComponent(project.body.code);

  return (
    <>
      <hgroup>
        <h1>{project.title}</h1>
        <h2 className="text-gray-600 dark:text-gray-300">
          {project.description}
        </h2>
      </hgroup>

      <Image
        src={project.coverImage}
        alt="coverImage"
        width={512}
        height={380}
        className="rounded-lg w-auto h-auto object-cover shadow-md"
      />

      <MDXContent />
    </>
  );
}
