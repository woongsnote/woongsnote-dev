import { Post } from 'contentlayer/generated';
import { Card } from '@/components';

type CardListProps = {
  articles: Post[];
};

export default function CardList({ articles }: CardListProps) {
  if (articles.length < 1) return <p>표시할 글이 없습니다!</p>;

  return (
    <>
      {articles.map((article) => (
        <Card
          key={article._id}
          url={`posts/${article.slug}`}
          title={article.title}
          description={article.description}
          date={article.date}
          tags={article.tags}
          readingTime={article.readingTime.text.charAt(0)}
          coverImage={article.coverImage}
          category={article.category}
        />
      ))}
    </>
  );
}
