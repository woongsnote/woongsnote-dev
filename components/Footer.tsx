import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="text-black-400 w-full mx-auto bottom-14 py-2 fixed sm:bottom-0 bg-white dark:bg-black">
      <div className=" mx-auto flex flex-row items-center justify-center w-full">
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
