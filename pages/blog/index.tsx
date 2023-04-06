import PageHeader from "components/PageHeader";
import PostCard from "components/PostCard";
import { InferGetStaticPropsType, NextPage, GetStaticPropsResult } from "next";
import { allPosts, Post } from "contentlayer/generated";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ posts: Post[] }>
> {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return {
    props: {
      posts,
    },
  };
}
const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <>
      <PageHeader
        title="Blog"
        description="공부한 내용들과 후기들을 기록합니다."
      />
      <div className="grid gap-y-4 gap-x-6 xl:gap-x-8 pt-2">
        {posts.map((post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </div>
    </>
  );
};

export default Blog;
