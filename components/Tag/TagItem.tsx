export default function TagItem({ title }: { title: string }) {
  return (
    <span className="font-bold rounded-lg p-1 text-xs text-primary dark:text-secondary">
      #{title}
    </span>
  );
}
