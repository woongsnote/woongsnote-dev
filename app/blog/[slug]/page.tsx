import { use } from "react";
import { ParsedUrlQuery } from "querystring";
import { getBlogBySlug, getBlogs } from "../../../lib/blogs";
import BlogHeader from "./BlogHeader";

interface Params extends ParsedUrlQuery {
  slug: string;
}
type Props = {
  params: Params;
};

const getInitialBlog = async (slug: string) => {
  const blog = getBlogBySlug(slug);
  return blog;
};

export default function BlogDetail({ params }: Props) {
  const blog = use(getInitialBlog(params.slug));
  return (
    <div className="w-full m-auto">
      <BlogHeader blog={blog} />
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />;
      </article>
    </div>
  );
}

export function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}
