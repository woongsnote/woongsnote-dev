import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="text-black-400 w-full h-10 fixed bottom-14 sm:bottom-0 sm:border-t bg-white dark:bg-black">
      <div className=" px-5 pt-2 mx-auto flex flex-row max-w-screen-md items-center gap-5 justify-center">
        <p>
          © 2022.
          <span className="text-md font-bold"> 문지웅 </span>
          All rights reserved.
        </p>
        <div className="flex flex-row gap-2 md:gap-4">
          <a href="https://github.com/woongsnote/" aria-label="github">
            <BsGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/woongsnote"
            aria-label="linkedin"
          >
            <BsLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
