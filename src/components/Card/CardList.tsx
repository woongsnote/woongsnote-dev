import { Post, Project } from 'contentlayer/generated';
import { Card } from '@/components';
import Link from 'next/link';

type CardListProps = {
  articles: (Post | Project)[];
  type: 'post' | 'project';
};

export default function CardList({ articles, type }: CardListProps) {
  const basePathType = {
    post: 'blog',
    project: 'projects',
  };

  const basePath = basePathType[type];

  return (
    <section className="cardList">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Link key={article._id} href={`${basePath}/${article.slug}`}>
            <Card
              type={type}
              title={article.title}
              description={article.description}
              date={article.date}
              tags={article.tags}
              readingTime={article.readingTime.text.charAt(0)}
              coverImage={article.coverImage}
            />
          </Link>
        ))
      ) : (
        <p>표시할 글이 없습니다!</p>
      )}
    </section>
  );
}
