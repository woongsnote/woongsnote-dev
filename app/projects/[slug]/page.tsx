import { allProjects } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { DetailPageHeader, DetailPageImage, Utterance } from '@/components';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
}

export default function Page({ params }: Props) {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) notFound();

  const MDXContent = useMDXComponent(project.body.code);

  return (
    <article className="py-6 prose dark:prose-invert mx-auto lg:prose-lg prose-h1:mb-1 prose-h2:my-2 prose-hr:my-4">
      <DetailPageHeader
        title={project.title}
        description={project.description}
      />
      <hr />
      <DetailPageImage coverImage={project.coverImage} />
      <MDXContent />
      <Utterance />
    </article>
  );
}
