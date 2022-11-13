import Layout from "../components/layout";
import PostItem from "../components/posts/PostItem";

export default function Blog() {
  return (
    <Layout>
      <div className="mx-auto flex flex-col p-2">
        <h1 className="text-3xl font-bold py-2">Blog</h1>
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
    </Layout>
  );
}
