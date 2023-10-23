import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DetailPageHeader,
  Utterance,
  MDXComponents,
  DetailPageImage,
} from '@/components';
import { getPageFromParams } from '@/lib/utils';
import { getPostBySlug, getPostContent, notionClient } from '@/lib/notion';

import { Post } from '@/components/post';
import remarkGfm from 'remark-gfm';
import { NotionToMarkdown } from 'notion-to-md';

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

  const n2m = new NotionToMarkdown({ notionClient: notionClient });

  const load = (async () => {
    const mdBlocks = await n2m.pageToMarkdown(post.id!);
    const mdString = n2m.toMarkdownString(mdBlocks);
    // console.log(mdString.parent);
    return mdString.parent;
  })();

  // const post = await getPageBySlug(params.slug);
  //Redirect to not found Page TODO Custom this page
  // if (!post) notFound();

  // const content = await getPageContent(post.id);

  // const notionRenderer = new NotionRenderer({ client: notionClient });

  // const html = await notionRenderer.render(...content);

  return (
    <article>
      {load}
      {/* <MDXComponents code={} /> */}
    </article>
    // <Post
    //   title={(post.properties.Title as any).title[0].plain_text}
    //   // content={html}
    //   thumbnail={(post.properties.ThumbNail as any).url}
    // />
  );
}
