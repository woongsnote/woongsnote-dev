import { NextPage } from "next";
import { use } from "react";
import { ParsedUrlQuery } from "querystring";
import { getBlogBySlug, getBlogs } from "../../../lib/blogs";
import ProjectHeader from "./ProjectHeader";

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

const ProjectDetail: NextPage<Props> = ({ params }) => {
  const blog = use(getInitialBlog(params.slug));
  return (
    <div className="w-full m-auto">
      <ProjectHeader blog={blog} />
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </div>
  );
};

export function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default ProjectDetail;
