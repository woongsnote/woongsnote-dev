import { NextPage } from "next";
import { use } from "react";
import { getBlogs } from "../lib/blogs";
import Image from "next/image";
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

const Page: NextPage = () => {
  const blogs = use(getInitialBlogs());

  return (
    <div>
      {/* about Me */}
      <section className="flex flex-col justify-center items-center md:flex-row-reverse py-8 mx-auto">
        <Image
          width={96}
          height={96}
          src="/profileImage.jpg"
          alt="프로필이미지"
          className="rounded-full"
        />
        <p className="p-2 text-md lg:text-xl">
          안녕하세요.
          <br /> 개발자 <span className="font-bold">문지웅</span>입니다.
          <br /> 새로운 무언가를 배우는 것을 좋아하고,
          <br />
          직관적인 인터페이스를 만들기 위해 노력합니다.
        </p>
      </section>
      {/* Latest Posts */}
      <section className="py-4">
        <div className="flex justify-between px-2 items-center">
          <h2 className="text-lg font-bold">최근 게시글</h2>
          <Link href={"/blogs"}>
            <button className="text-black hover:bg-slate-500 p-2 hover:text-white rounded-lg">
              전체보기
            </button>
          </Link>
        </div>
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">
            <h3 className="mt-4 text-lg text-gray-700">{blog.title}</h3>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {shortify(blog.description, 100)}
            </p>
          </Link>
        ))}
      </section>
      <div className="h-10" />
      {/* Latest Projects */}
      <section>
        <div className="flex justify-between px-2 items-center">
          <h2 className="text-lg font-bold">최근 프로젝트</h2>
          <Link href={"/blogs"}>
            <button className="text-black hover:bg-slate-500 p-2 hover:text-white rounded-lg">
              전체보기
            </button>
          </Link>
        </div>
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">
            <h3 className="mt-4 text-lg text-gray-700">{blog.title}</h3>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {shortify(blog.description, 100)}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Page;
