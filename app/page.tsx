import { getBlogs } from "../lib/blogs";
import { use } from "react";
import Link from "next/link";
import Intro from "./Intro";

async function getInitialBlogs() {
  const fileNames = getBlogs();
  return fileNames;
}

const shortify = (text: string, maxLength = 60) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + " ...";
};

export default function Page() {
  const blogs = use(getInitialBlogs());
  //todo 날짜순 정렬 필요
  const latestBlogs = blogs.length > 4 ? blogs.slice(0, 4) : blogs;

  return (
    <>
      <Intro />
      <div>
        <h2 className="">최신 게시글</h2>
      </div>

      <div className="grid grid-cols-1 gap-y-2 gap-x-6 xl:gap-x-8 py-2">
        {latestBlogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group hover:bg-slate-400 p-2 rounded-xl"
          >
            <h3 className="mt-4 text-xl font-bold text-gray-900 ">
              {blog.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-600">
              {shortify(blog.description, 100)}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
