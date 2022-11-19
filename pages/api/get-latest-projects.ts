import { notion } from "./client";

const databaseId = process.env.NOTION_DATABASE_ID ?? "";

export async function getLatestPosts() {
  const myLatestPosts = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: "Category",
          select: { equals: "Post" },
        },
      ],
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  return myLatestPosts;
}
