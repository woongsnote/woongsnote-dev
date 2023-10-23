import Image from 'next/image';

type PostProps = {
  title: string;
  content: string;
  thumbnail: string;
};

export function Post(props: PostProps) {
  const { title, content, thumbnail } = props;

  return (
    <article className="prose mx-auto">
      <h1>{title}</h1>
      <Image src={thumbnail} alt={title} width={'800'} height={'480'} />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
