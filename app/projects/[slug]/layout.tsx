import Utterance from 'app/components/Utterance';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <article className="py-4 prose dark:prose-invert mx-auto lg:prose-lg prose-h1:mb-1 prose-h2:my-2">
      {children}
      <Utterance />
    </article>
  );
}
