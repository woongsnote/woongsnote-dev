import { compareDesc } from 'date-fns';

export function getSortedDataList<T extends { date: string }>(
  data: T[],
  maxNum?: number,
) {
  const sortedData = data.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return maxNum ? sortedData.slice(0, maxNum) : sortedData;
}

export async function getPageFromParams<T extends { slug: string }>(
  params: T,
  data: Array<T>,
) {
  const slug = params.slug;
  const page = data.find((doc) => doc.slug === slug);
  if (!page) {
    null;
  }
  return page;
}

export function getPostsByCategory<T extends { category: string }>({
  category,
  data,
}: {
  category: string;
  data: Array<T>;
}) {
  if (category === 'All') return data;

  return data.filter((post) => post.category?.match(category));
}
