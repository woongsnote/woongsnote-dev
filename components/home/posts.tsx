import PostItem from "../posts/post";
import SectionHeader from "./header";

interface Props {
  posts: any[];
}

const LatestPosts = ({ posts }: Props) => {
  return (
    <section className="my-4">
      <div className="px-4 md:px-8 mx-auto">
        <SectionHeader
          title="최신 게시글"
          linkTitle="전체보기"
          linkAddress="/blog"
        />

        <div className="grid  gap-4 md:gap-6 xl:gap-8 mt-3">
          {posts &&
            posts.map((post) => (
              <PostItem
                key={post.id}
                title={post.properties.Title.title[0].plain_text}
                date={new Date(post.created_time).toLocaleDateString()}
                description={
                  post.properties.Description.rich_text[0]?.plain_text
                }
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
