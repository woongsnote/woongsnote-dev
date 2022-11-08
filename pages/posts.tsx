import React from "react";
import Layout from "../components/Layout";
import PostItem from "../components/posts/PostItem";

export default function Posts() {
  return (
    <Layout>
      <h3 className="text-center text-3xl font-bold my-4">My Posts</h3>

      <PostItem title="test" date="2022-11-07" description="test" />
      <PostItem title="test" date="2022-11-07" description="test" />
      <PostItem title="test" date="2022-11-07" description="test" />
      <PostItem title="test" date="2022-11-07" description="test" />
      <PostItem title="test" date="2022-11-07" description="test" />
      <PostItem title="test" date="2022-11-07" description="test" />
    </Layout>
  );
}
