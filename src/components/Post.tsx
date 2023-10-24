import Image from 'next/image';
import { PublishedDate, TagList } from '.';

type PostProps = {
  title: string;
  content: string;
  thumbnail: string;
  date: string;
  tags: string[];
};

const Post = (props: PostProps) => {
  const { title, content, thumbnail, date, tags } = props;

  return (
    <article className="w-full mb-10 flex flex-col pt-10 py-4 max-w-3xl mx-auto">
      <h1 className="text-4xl lg:text-5xl font-black">{title}</h1>
      <div className="flex flex-row items-center gap-2 justify-start w-full mx-auto my-4">
        <span className="font-bold">@woongsnote</span>
        <PublishedDate date={date} />
      </div>
      <TagList tags={tags} />
      <hr className="my-4 w-full" />
      <div className="max-w-xl overflow-hidden flex items-center mx-auto w-full p-4">
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={500}
          priority
          className="w-full h-60 lg:h-72 rounded-md object-cover"
        />
      </div>
      <div
        className="text-base lg:text-xl mt-4 lg:max-w-3xl leading-10 prose dark:prose-invert items-center"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
};

export default Post;
