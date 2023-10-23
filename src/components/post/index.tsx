import Image from 'next/image';

type PostProps = {
  title: string;
  content: string;
  thumbnail: string;
};

export function Post(props: PostProps) {
  const { title, content, thumbnail } = props;

  return (
    <article className="w-full mb-10 flex flex-col items-center pt-10">
      <h1 className="text-4xl font-black mb-8">{title}</h1>
      <div className="max-w-xl overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={500}
          priority
          className="w-full h-80 rounded-md"
        />
      </div>
      <div
        className="text-base lg:text-xl mt-4 max-w-3xl leading-10 prose"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
