import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from 'react-icons/bs'

const Intro = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col justify-center items-center md:flex-row-reverse py-2 sm:py-8 mx-auto">
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
      </div>
      <div className="flex flex-row justify-center items-center gap-8 py-2">
        <Link href="/about" className="hover:text-indigo-600 hover:font-bold px-2 mx-4">About Me</Link>
        <a href="https://www.github.com/woongsnote" className="rounded-xl p-2 shadow-lg hover:scale-105">
          <BsGithub size={32}/>
        </a>
        <a href="https://www.linkedin.com/in/woongsnote" className="rounded-xl p-2 shadow-lg hover:scale-105">
          <BsLinkedin size={32}/>
        </a>
        
      </div>
      
    </section>
  );
};

export default Intro;
