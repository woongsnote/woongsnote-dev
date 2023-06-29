import Link from 'next/link';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

const SocialButtons = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-8">
      <Link
        href="/about"
        className="rounded-xl font-bold p-2 mx-4 shadow-xl hover:scale-105 hidden"
      >
        About Me
      </Link>
      <a
        href="https://www.github.com/woongsnote"
        aria-label="github"
        className="rounded-xl p-2 shadow-xl hover:scale-105"
      >
        <BsGithub size={32} />
      </a>
      <a
        href="https://www.linkedin.com/in/woongsnote"
        aria-label="linkedin"
        className="rounded-xl p-2 shadow-xl hover:scale-105"
      >
        <BsLinkedin size={32} />
      </a>
    </div>
  );
};

export default SocialButtons;
