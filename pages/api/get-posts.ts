import { notion } from "./client";

export async function getPosts() {
  const myPosts = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE_ID}`,
    filter: {
      and: [
        {
          property: "Published",
          checkbox: { equals: true },
        },
        {
          property: "Category",
          select: { equals: "Post" },
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
  return myPosts.results;
}
