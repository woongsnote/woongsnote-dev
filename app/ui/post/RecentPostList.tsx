import { Post } from '@/.contentlayer/generated';
import { RecentPost } from './RecentPost';

export const RecentPostList = ({ recentPosts }: { recentPosts: Post[] }) => {
  return (
    <section className="mb-10 p-2 flex flex-col">
      <strong className="text-xl mb-4">최근 작성한 글</strong>
      <ul className="grid grid-cols-3 w-full gap-2 justify-start">
        {recentPosts.map((recentPost) => (
          <li key={recentPost._id} className="">
            <RecentPost post={recentPost} />
          </li>
        ))}
      </ul>
    </section>
  );
};
