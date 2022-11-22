import { notion } from "./client";

const databaseId = process.env.NOTION_DATABASE_ID ?? "";

async function getProjects() {
  const myPosts = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Published",
          checkbox: { equals: true },
        },
        {
          property: "Category",
          select: { equals: "Project" },
        },
      ],
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
  });
  return myPosts;
}

export { getProjects };
