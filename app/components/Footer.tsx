import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="text-black-400 w-full left-0 bottom-14 py-2 fixed sm:bottom-0 bg-white dark:bg-[#111111]">
      <div className=" mx-auto flex flex-row items-center justify-center w-full">
        <p>
          © 2023.
          <span className="text-md font-bold"> 문지웅 </span>
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
