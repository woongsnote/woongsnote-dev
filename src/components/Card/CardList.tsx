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
    <section className="px-2 md:px-4 grid mt-4 sm:gap-8 md:grid-cols-2 w-full mx-auto justify-items-stretch">
      {articles.map((article) => (
        <Link key={article._id} href={`${basePath}/${article.slug}`}>
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
