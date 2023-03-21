import Image from "next/image";

const DetailHeader = ({ data }: any) => {
  return (
    <div className="py-2 mb-8">
      <h1 className="text-3xl font-bold mb-1">{data.title}</h1>
      <h2 className="mb-2 text-md md:text-lg text-gray-600 dark:text-gray-400">
        {data.description}
      </h2>
      <div className="h-40 md:h-96 bg-black mx-auto w-3/4 relative rounded-xl">
        <Image
          src={data.coverImage}
          alt="coverImage"
          fill
          priority
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default DetailHeader;
