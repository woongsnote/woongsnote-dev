import { Post, Project } from 'contentlayer/generated';
import { Card } from '@/components';
import Link from 'next/link';

type CardListProps = {
  articles: Post[] | Project[];
  type: 'post' | 'project';
};

export default function CardList({ articles, type }: CardListProps) {
  const basePath = type === 'post' ? 'blog' : 'projects';

  return (
    <section className="px-2 grid mt-4 sm:gap-4 lg:gap-8 lg:grid-cols-2 w-full">
      {articles.map((article) => (
        <Link
          key={article._id}
          href={`${basePath}/${article.slug}`}
          className="col-span-1"
        >
          <Card
            title={article.title}
            description={article.description}
            date={article.date}
            tags={article.tags}
            readingTimeText={article.readingTime.text}
            coverImage={article.coverImage}
          />
        </Link>
      ))}
    </section>
  );
}
