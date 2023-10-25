import { Client } from '@notionhq/client';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      status: {
        equals: 'Published',
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });
  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post: any) => {
  const getTags = (tags: any) => {
    const allTags = tags.map((tag: any) => {
      return tag.name;
    });
    return allTags;
  };

  return {
    id: post.id,
    title: post.properties.Title.title[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    thumbnail: post.properties.Thumbnail.url,
    slug: post.properties.Slug.rich_text[0].plain_text,
    category: post.properties.Category.select.name,
  };
};

export const getPostContent = async (pageId: string) => {
  const res = await notion.blocks.children.list({ block_id: pageId });
  return res.results as BlockObjectResponse[];
};

export const getPostBySlug = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });
  const page = response.results[0];
  const metadata = getPageMetaData(page);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    metadata,
    markdown: mdString,
  };
};
export const getPostThumbnail = (title: string): string =>
  `https://woongsnote.dev/og?title=${title}`;
