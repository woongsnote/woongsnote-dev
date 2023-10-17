import { Post, Project } from 'contentlayer/generated';
import { Card } from '@/components';

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
          <Card
            key={article._id}
            url={`${basePath}/${article.slug}`}
            type={type}
            title={article.title}
            description={article.description}
            date={article.date}
            tags={article.tags}
            readingTime={article.readingTime.text.charAt(0)}
            coverImage={article.coverImage}
          />
        ))
      ) : (
        <p>표시할 글이 없습니다!</p>
      )}
    </section>
  );
}
