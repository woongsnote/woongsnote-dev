import { getBlogs } from "../lib/blogs";
import { use } from "react";
import Intro from "./Intro";
import LatestPost from "./LatestPost";

async function getInitialBlogs() {
  const fileNames = getBlogs();
  return fileNames;
}

export default function Page() {
  const blogs = use(getInitialBlogs());
  //todo 날짜순 정렬 필요
  const latestBlogs = blogs.length > 4 ? blogs.slice(0, 4) : blogs;

  return (
    <>
      <Intro />
      <div className="my-4 pb-2 border-b border-b-gray-500">
        <h2 className="text-2xl font-bold">최신 게시글</h2>
      </div>

      <div className="grid gap-y-10 gap-x-6 xl:gap-x-8 pt-2">
        {latestBlogs.map((blog) => (
           <LatestPost key={blog.slug} {...blog} />
        ))}
      </div>
    </>
  );
}
