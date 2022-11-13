import PostItem from "../posts/PostItem";
import SectionHeader from "./SectionHeader";

export default function LatestPosts() {
  return (
    <section className="my-4">
      <div className="px-4 md:px-8 mx-auto">
        <SectionHeader
          title="최신 게시글"
          linkTitle="전체보기"
          linkAddress="/blog"
        />

        <div className="grid  gap-4 md:gap-6 xl:gap-8 mt-3">
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
    </section>
  );
}
