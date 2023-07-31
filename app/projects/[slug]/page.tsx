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
      <h1 className="mb-1">{project.title}</h1>
      <p className="mt-0 mb-2 text-gray-700 dark:text-gray-300">
        {project.description}
      </p>
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
      <MDXContent />
    </>
  );
}
