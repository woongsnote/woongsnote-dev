import React from "react";
import Layout from "../components/Layout";
import PostItem from "../components/posts/PostItem";

export default function Blog() {
  return (
    <Layout>
      <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
        <div>
          <h1 className="text-3xl font-bold my-4">Blog</h1>
          <p>블로그입니다</p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 xl:gap-8">
          <PostItem
            title="New trends in Tech"
            date="July 19, 2021"
            description="This is a section of some simple filler text, also known as
          placeholder text."
          />
          <PostItem
            title="New trends in Tech"
            date="July 19, 2021"
            description="This is a section of some simple filler text, also known as
          placeholder text."
          />
          <PostItem
            title="New trends in Tech"
            date="July 19, 2021"
            description="This is a section of some simple filler text, also known as
          placeholder text."
          />
          <PostItem
            title="New trends in Tech"
            date="July 19, 2021"
            description="This is a section of some simple filler text, also known as
          placeholder text."
          />
        </div>
      </div>
    </Layout>
  );
}
