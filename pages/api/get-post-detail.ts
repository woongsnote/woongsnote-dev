import { notion } from "./client";

export async function getPostDetail(id: string) {
  const myPost = await notion.pages.retrieve({
    page_id: id,
  });
  return myPost;
}
