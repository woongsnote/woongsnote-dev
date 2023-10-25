import Image from 'next/image';
import 'supports-color';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PublishedDate, ReadingTime, TagList } from '@/components';

type PostProps = {
  title: string;
  content: any;
  thumbnail: string;
  date: string;
  tags: string[];
  readingTimeText: string;
};

const Post = (props: PostProps) => {
  const { title, content, thumbnail, date, tags, readingTimeText } = props;

  return (
    <article className="w-full mb-10 flex flex-col pt-10 py-4 max-w-3xl mx-auto">
      <h1 className="text-4xl lg:text-5xl font-black">{title}</h1>
      <div className="flex flex-row items-center gap-2 justify-start w-full mx-auto my-4">
        <span className="font-bold">@woongsnote</span>
        <PublishedDate date={date} />
        <ReadingTime readingTime={readingTimeText} />
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
      <div className="text-base lg:text-xl mt-4 lg:max-w-3xl leading-10 prose dark:prose-invert items-center">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[]}>
          {content}
        </Markdown>
      </div>
    </article>
  );
};

export default Post;
