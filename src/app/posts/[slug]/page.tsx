import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Post, allPosts } from 'contentlayer/generated';
import Image from 'next/image';
import { getPostThumbnail } from '@/lib/utils';
import { useMDXComponent } from 'next-contentlayer/hooks';
import {
  PublishedDate,
  ReadingTime,
  TagList,
  MDXComponents,
} from '@/components';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return allPosts.map((post: Post) => ({
    slug: post._raw.flattenedPath,
  }));
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const tags = post.tags?.map((tag) => tag.title).join(', ');
  return {
    title: post.title,
    description: post.description,
    keywords: tags,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: `/og?title=${post.title}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) notFound();

  const { title, date, readingTime, coverImage, tags } = post;

  const readingTimeText = readingTime.text.split(' ')[0];

  const thumbnail = coverImage ?? getPostThumbnail(title);

  return (
    <article className="w-full mb-10 flex flex-col pt-6 py-4 max-w-3xl mx-auto">
      <h1 className="text-3xl lg:text-5xl font-black">{title}</h1>
      <div className="flex items-center gap-2 justify-start w-full mx-auto my-4">
        <span className="font-bold">@woongsnote</span>
        <PublishedDate date={date} />
        <ReadingTime readingTime={readingTimeText} />
      </div>
      <TagList tags={tags} />
      <hr className="my-4 w-full" />
      <div className="max-w-xl overflow-hidden flex items-center mx-auto w-full p-4">
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={500}
          priority
          className="w-full h-60 lg:h-72 rounded-md object-cover"
        />
      </div>
      <div className="text-base lg:text-xl mt-4 lg:max-w-3xl leading-10 prose dark:prose-invert items-center">
        <MDXComponents code={post.body.code} />
      </div>
    </article>
  );
}
