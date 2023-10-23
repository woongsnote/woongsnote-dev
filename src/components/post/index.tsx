import Image from 'next/image';

type PostProps = {
  title: string;
  content: string;
  thumbnail: string;
};

export function Post(props: PostProps) {
  console.log(props);
  const { title, content, thumbnail } = props;

  return (
    <article className="w-full mb-10 flex flex-col pt-10 py-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-black">{title}</h1>
      <div className="flex flex-row items-start justify-start w-full mx-auto mt-4">
        <span className="font-bold">@woongsnote</span>
      </div>
      <hr className="my-4 w-full" />
      <div className="max-w-xl overflow-hidden flex items-center mx-auto">
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
        className="text-base lg:text-xl mt-4 lg:max-w-3xl leading-10 prose"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
