import Link from 'next/link';
import Image from 'next/image';
import { TagList } from '..';
import Category from './Category';
export function CardList({ articles }: { articles: any[] }) {
  if (articles.length < 1) return <p>표시할 글이 없습니다!</p>;

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 items-start px-4">
      {articles.map((article) => (
        <li key={article.id}>
          <article className="border rounded-lg lg:hover:scale-105 transition delay-150">
            <Link href={`/${article.slug}`}>
              <Image
                src={
                  article.thumbnail ??
                  `https://woongsnote.dev/og?title=${article.title}`
                }
                alt={article.title}
                priority
                className="h-48 w-full object-cover rounded-t-lg"
                width={500}
                height={500}
              />
            </Link>
            <div className="p-2 flex flex-col gap-2">
              <Category category={article.category} />
              <Link
                href={`/${article.slug}`}
                className="hover:underline underline-offset-8 hover:text-primary dark:text-secondary"
              >
                <h2 className="text-2xl">{article.title}</h2>
              </Link>
              <time className="text-sm">{article.date}</time>
              <p className="text-sm text-gray-500">{article.description}</p>
              <TagList tags={article.tags} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
