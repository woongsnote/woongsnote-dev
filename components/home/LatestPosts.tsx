import React from "react";
import PostItem from "../posts/PostItem";
import SectionHeader from "./SectionHeader";

export default function LatestPosts() {
  return (
    <section className="mt-4">
      <SectionHeader
        title="Latest Posts"
        linkTitle="All Posts"
        linkAddress="/posts"
      />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </div>
        </div>
      </div>
    </section>
  );
}
