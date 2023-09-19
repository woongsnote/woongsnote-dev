export default function TagItem({ title }: { title: string }) {
  return (
    <span className="border-2 font-bold rounded-lg p-1 text-xs text-gray-700 dark:text-gray-300">
      {title}
    </span>
  );
}
