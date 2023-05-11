import { allPosts } from "contentlayer/generated";
import Container from "components/Container";
import PageHeader from "components/PageHeader";
import PostCard from "components/PostCard";
import { compareDesc } from "date-fns";

export const metadata = {
  title: { absolute: "Blog | Woongsnote" },
};

export default function Blog() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <Container>
      <PageHeader title="Blog" description="공부한 내용들을 기록합니다." />
      <div className="flex flex-col gap-y-4 gap-x-6 xl:gap-x-8 pt-2">
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </Container>
  );
}
