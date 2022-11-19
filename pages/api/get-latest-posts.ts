import { notion } from "./client";

export async function getLatestPosts() {
  const myLatestPosts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
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
