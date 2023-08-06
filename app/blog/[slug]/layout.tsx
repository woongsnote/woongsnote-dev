import Utterance from 'app/components/Utterance';

export default function PostLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <article className="py-6 prose dark:prose-invert mx-auto lg:prose-lg prose-h1:mb-1 prose-h2:my-2 prose-hr:my-4">
      {children}
      <Utterance />
    </article>
  );
}
