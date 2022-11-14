import Page from "../../components/page";
import Title from "../../components/page/title";
import PostItem from "../../components/posts/post";

const Posts = () => {
  return (
    <Page>
      <Title pageTitle="Blog" pageDescription="블로그입니다" />

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
    </Page>
  );
};

export default Posts;
