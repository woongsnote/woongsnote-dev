export default function TagItem({ title }: { title: string }) {
  return (
    <span className="font-bold p-1 text-xs px-2 py-1 text-gray-500 border rounded-full">
      {title}
    </span>
  );
}
