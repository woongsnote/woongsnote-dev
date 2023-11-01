import { Post } from '@/.contentlayer/generated';
import { RecentPost } from './RecentPost';

export const RecentPostList = ({ recentPosts }: { recentPosts: Post[] }) => {
  return (
    <section className="mb-10 p-2 flex flex-col mt-2 lg:mt-10 overflow-x-scroll lg:overflow-hidden">
      <strong className="text-xl mb-4">최근 작성한 글</strong>

      <ul className="flex w-full gap-8 justify-start mx-auto">
        {recentPosts.map((recentPost) => (
          <li
            key={recentPost._id}
            className="flex items-center justify-center w-full"
          >
            <RecentPost post={recentPost} />
          </li>
        ))}
      </ul>
    </section>
  );
};
