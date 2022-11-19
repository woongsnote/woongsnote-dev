import { notion } from "./client";

const databaseId = process.env.NOTION_DATABASE_ID ?? "";

async function getProjects() {
  const myPosts = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: "Category",
          select: { equals: "Project" },
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
  return myPosts;
}

export { getProjects };
