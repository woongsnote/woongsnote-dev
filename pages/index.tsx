import { NextPage } from "next";
import Layout from "../components/layout";
import { getDatabase, getMeta } from "../lib/notion";
import Image from "next/image";

interface Props {
  posts: [any];
  meta: [any];
}

const Home: NextPage<Props> = ({ posts, meta }) => {
  console.log(posts);

  return (
    <Layout>
      <section className="flex flex-col justify-center items-center md:flex-row-reverse py-8 mx-auto">
        <Image
          width={96}
          height={96}
          src="/profileImage.jpg"
          alt="프로필이미지"
          className="rounded-full"
        />
        <p className="p-2 text-md lg:text-xl">
          안녕하세요. 주니어 개발자 <span className="font-bold">문지웅</span>
          입니다.
          <br /> 새로운 무언가를 배우는 것을 좋아하고,
          <br />
          직관적인 인터페이스를 만들기 위해 노력합니다.
        </p>
      </section>
      <section>Posts</section>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const database = await getDatabase(`${process.env.NOTION_DATABASE_ID}`);
  const dbMeta = await getMeta(`${process.env.NOTION_DATABASE_ID}`);
  return {
    props: {
      posts: database,
      meta: dbMeta,
    },
    revalidate: 1,
  };
};
