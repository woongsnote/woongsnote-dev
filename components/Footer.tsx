import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="text-black-400 w-full fixed bottom-14 sm:bottom-0 sm:border-t bg-white dark:bg-black py-1">
      <div className=" mx-auto flex flex-row items-center justify-center">
        <p>
          © 2023.
          <span className="text-md font-bold"> 문지웅 </span>
          All rights reserved.
        </p>
        <div className="ml-2 flex flex-row gap-2 md:gap-4">
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
