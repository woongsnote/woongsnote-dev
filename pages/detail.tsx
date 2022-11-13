import Layout from "../components/layout";
import Image from "next/image";
import temp from "../public/profileImage.jpg";

export default function Detail() {
  return (
    <Layout>
      <div id="post-header" className=" border-b-2 pb-2 mb-2">
        <h1 className="py-4 font-bold text-3xl">게시글 제목</h1>
        <span>작성일: 2022-11-13</span>
      </div>
      <div id="post-detail" className="w-full">
        <div className="relative w-64 h-64 p-2 mx-auto">
          <Image
            src={temp}
            fill
            priority
            alt="test"
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        <p>테스트 중입니다.</p>
      </div>
    </Layout>
  );
}
