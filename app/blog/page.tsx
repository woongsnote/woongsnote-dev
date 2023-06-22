import { Post, allPosts } from "contentlayer/generated";
import PageHeader from "app/layouts/PageHeader";
import PostList from "app/components/PostList";
import { getSortedDataList } from "utils/getData";

export const metadata = {
  title: { absolute: "Blog | Woongsnote" },
};

export default function Blog() {
  const posts: Post[] = getSortedDataList(allPosts);

  return (
    <>
      <PageHeader title="Blog" description="학습한 내용들을 기록합니다." />
      <PostList posts={posts} />
    </>
  );
}
