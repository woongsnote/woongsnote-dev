import Link from "next/link";
import { Post } from "../../types";

const PostItem = ({ title, description, date }: Post) => {
  return (
    <Link href={`/blog/${title}`}>
      <div className="flex flex-col w-full overflow-hidden gap-2 hover:bg-slate-100 rounded-lg p-2">
        <h2 className="text-gray-800 text-3xl font-bold ">{title}</h2>

        <p className="text-gray-500">{description}</p>

        <span className="text-gray-400 text-sm">{date}</span>
      </div>
    </Link>
  );
};

export default PostItem;
