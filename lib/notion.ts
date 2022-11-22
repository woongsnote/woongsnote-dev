import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getMeta = async (databaseId: string) => {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    return response;
  } catch (error: unknown) {}
};

export const getDatabase = async (databaseId: string) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [
        {
          property: "Created",
          direction: "descending",
        },
      ],
    });
    return response.results;
  } catch (error: unknown) {}
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const blocks = [];
  let cursor: string | undefined;
  while (true) {
    const {
      results,
      next_cursor,
    }: { results: any; next_cursor: string | null } =
      await notion.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      });
    blocks.push(results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};
