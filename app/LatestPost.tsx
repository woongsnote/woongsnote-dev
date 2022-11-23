import Link from "next/link"
import { Blog } from "../interfaces/Blog"

const LatestPost = (blog:Blog) => {
  return (
    <Link
      key={blog.slug}
      href={`/blog/${blog.slug}`}
      className="group rounded-xl border-solid  border p-2 hover:bg-indigo-200"
    >
      <h3 className="text-xl text-gray-700">{blog.title}</h3>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {blog.description}
      </p>
    </Link>
  )
}

export default LatestPost