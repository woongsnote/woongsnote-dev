import { Project, allProjects } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DetailPageHeader,
  DetailPageImage,
  Utterance,
  MDXComponents,
} from '@/components';
import { getPageFromParams } from '@/lib/utils';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = (await getPageFromParams(params, allProjects)) as Project;
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
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectLayout({ params }: PageProps) {
  const project = (await getPageFromParams(params, allProjects)) as Project;

  if (!project) notFound();

  return (
    <article className="post">
      <DetailPageHeader
        title={project.title}
        description={project.description}
        date={project.date}
        readingTimeText={project.readingTime.text}
      />
      <hr />
      <DetailPageImage coverImage={project.coverImage} />
      <MDXComponents code={project.body.code} />
      <Utterance />
    </article>
  );
}
