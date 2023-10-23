import Link from 'next/link';
import { PublishedDate, TagList } from '@/components';
import Category from './Category';
export function CardList({ articles }: { articles: any[] }) {
  if (articles.length < 1) return <p>표시할 글이 없습니다!</p>;

  return (
    <ol className="px-4 w-full mx-auto max-w-3xl">
      {articles.map((article) => (
        <li
          key={article.id}
          className="shadow-sm border rounded-md my-2 lg:hover:shadow-lg"
        >
          <article className="w-full py-2">
            <div className="p-2 flex flex-col gap-2">
              <Category category={article.category} />
              <Link
                href={`/${article.slug}`}
                className="hover:underline underline-offset-8 hover:text-primary dark:text-secondary"
              >
                <h2 className="text-2xl font-bold">{article.title}</h2>
              </Link>
              <PublishedDate date={article.date} />
              <p className="text-sm lg:text-lg text-gray-500">
                {article.description}
              </p>
              <TagList tags={article.tags} />
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
