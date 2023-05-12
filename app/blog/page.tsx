import { Post, allPosts } from "contentlayer/generated";
import Container from "components/Container";
import PageHeader from "components/PageHeader";
import PostList from "components/PostList";
import { getSortedDataList } from "utils/getData";

export const metadata = {
  title: { absolute: "Blog | Woongsnote" },
};

export default function Blog() {
  const posts: Post[] = getSortedDataList(allPosts);

  return (
    <Container>
      <PageHeader title="Blog" description="공부한 내용들을 기록합니다." />
      <PostList posts={posts} />
    </Container>
  );
}
