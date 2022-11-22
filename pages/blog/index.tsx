import type { NextPage } from "next";
import Page from "../../components/page";
import Title from "../../components/page/title";
import PostItem from "../../components/posts/post";
import { getPosts } from "../api/get-posts";

export async function getStaticProps() {
  let results = await getPosts();
  return {
    props: {
      posts: results,
    },
  };
}
interface Props {
  posts: [any];
}

const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <Page>
      <Title pageTitle="Blog" pageDescription="공부한 내용들을 기록합니다." />

      <div className="flex flex-col gap-4 md:gap-6 xl:gap-8">
        {posts &&
          posts.map((post) => (
            <PostItem
              key={post.id}
              title={post.properties.Title.title[0].plain_text}
              date={post.properties.Created.date?.start}
              description={post.properties.Description.rich_text[0]?.plain_text}
              slug={post.properties.slug.rich_text[0]?.plain_text}
            />
          ))}
      </div>
    </Page>
  );
};

export default Posts;
