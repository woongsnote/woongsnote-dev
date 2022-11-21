import { NextPage } from "next";
import { use } from "react";
import { getBlogs } from "../../lib/blogs";
import Link from "next/link";

async function getInitialBlogs() {
  const blogs = getBlogs();
  return blogs;
}

const shortify = (text: string, maxLength = 60) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

const Blogs: NextPage = () => {
  const blogs = use(getInitialBlogs());

  return (
    <div>
      <div className="py-2">
        <h2 className="text-3xl font-bold py-1 mb-2">Blog</h2>
        <p>공부한 내용들을 기록합니다.</p>
      </div>
      <div className="">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group">
            <h3 className="mt-4 text-lg text-gray-700">{blog.title}</h3>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {shortify(blog.description, 100)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
