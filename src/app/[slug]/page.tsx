import { notFound } from 'next/navigation';
import { getPostBySlug, getPostContent, notionClient } from '@/lib/notion';
import { Post } from '@/components/post';
import { NotionRenderer } from '@notion-render/client';

type PageProps = {
  params: { slug: string };
};

// export async function generateStaticParams(): Promise<PageProps['params'][]> {
//   return allPosts.map((post) => ({ slug: post.slug }));
// }

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const post = (await getPageFromParams(params, allPosts)) as Post;
//   if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
//   const tags = post.tags?.map((tag) => tag.title).join(', ');
//   return {
//     title: post.title,
//     description: post.description,
//     keywords: tags,
//     openGraph: {
//       title: post.title,
//       description: post.description,
//       images: [
//         {
//           url: `/og?title=${post.title}`,
//           width: 1200,
//           height: 630,
//           alt: post.title,
//         },
//       ],
//     },
//   };
// }

export default async function PostLayout({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const content = await getPostContent(post.id);

  const notionRenderer = new NotionRenderer({ client: notionClient });

  const html = await notionRenderer.render(...content);

  return (
    <Post
      title={(post.properties.Title as any).title[0].plain_text}
      content={html}
      thumbnail={(post.properties.Thumbnail as any).url ?? ''}
    />
  );
}
