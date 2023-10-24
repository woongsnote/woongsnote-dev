import { notFound } from 'next/navigation';
import { getPostBySlug, getPostContent, notionClient } from '@/lib/notion';
import { Post } from '@/components';
import { NotionRenderer } from '@notion-render/client';
import { getPageMetaData, getThumbnail } from '@/lib/utils';
import { Metadata } from 'next';

type PageProps = {
  params: { slug: string };
};

// export async function generateStaticParams(): Promise<PageProps['params'][]> {
//   return allPosts.map((post) => ({ slug: post.slug }));
// }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const postDetail = getPageMetaData(post);
  const tags = postDetail.tags.join(', ');
  return {
    title: postDetail.title,
    description: postDetail.description,
    keywords: tags,
    openGraph: {
      title: postDetail.title,
      description: postDetail.description,
      images: [
        {
          url: `/og?title=${postDetail.title}`,
          width: 1200,
          height: 630,
          alt: postDetail.title,
        },
      ],
    },
  };
}

export default async function PostLayout({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const postDetail = getPageMetaData(post);

  const { title, date, tags, thumbnail } = postDetail;

  const detailThumbnail: string = thumbnail ?? getThumbnail(title);

  const content = await getPostContent(post.id);

  const notionRenderer = new NotionRenderer({ client: notionClient });

  const html = await notionRenderer.render(...content);

  return (
    <Post
      title={title}
      content={html}
      thumbnail={detailThumbnail}
      date={date}
      tags={tags}
    />
  );
}
