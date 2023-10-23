import { Client } from '@notionhq/client';
import {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';
import { getPageMetaData } from './utils';

export const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

export const getAllPosts = async () => {
  const posts = await notionClient.databases.query({
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

export const getPostContent = async (pageId: string) => {
  const res = await notionClient.blocks.children.list({ block_id: pageId });
  return res.results as BlockObjectResponse[];
};

export const getPostBySlug = async (slug: string) => {
  const res = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });
  return res.results[0] as PageObjectResponse | undefined;
};
