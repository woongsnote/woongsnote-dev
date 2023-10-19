export default function Category({ category }: { category: string }) {
  if (category.match('Project'))
    return <span className="Category Project">{category}</span>;

  if (category.match('Diary'))
    return <span className="Category Diary">{category}</span>;

  return <span className="Category">{category}</span>;
}
