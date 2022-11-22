import { getBlogs } from "../../lib/blogs";
import { use } from "react";
import Header from "./Header";
import PostCard from "./PostCard";

async function getInitialBlogs() {
  const fileNames = getBlogs();
  return fileNames;
}

export const shortify = (text: string, maxLength = 60) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + " ...";
};

export default function Page() {
  const blogs = use(getInitialBlogs());
  return (
    <>
      <Header />
      <div className="grid gap-y-10 gap-x-6 xl:gap-x-8 pt-2">
        {blogs.map((blog) => (
          <PostCard key={blog.slug} {...blog} />
        ))}
      </div>
    </>
  );
}
