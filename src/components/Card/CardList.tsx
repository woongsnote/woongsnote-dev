import { Post } from 'contentlayer/generated';
import { Card } from '@/components';

export function CardList({ articles }: { articles: Post[] }) {
  if (articles.length < 1) return <p>표시할 글이 없습니다!</p>;

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 items-start px-4">
      {articles.map((article) => (
        <li key={article._id}>
          <Card
            url={`/${article.slug}`}
            title={article.title}
            description={article.description}
            date={article.date}
            tags={article.tags}
            readingTime={article.readingTime.text.charAt(0)}
            coverImage={article.coverImage}
            category={article.category}
          />
        </li>
      ))}
    </ul>
  );
}
