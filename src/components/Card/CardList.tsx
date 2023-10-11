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
    <ul className="px-2 lg:px-0">
      {articles.map((article) => (
        <li key={article._id} className="my-4 lg:my-8">
          <Link href={`${basePath}/${article.slug}`}>
            <Card {...article} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
