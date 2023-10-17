import { BsGithub } from 'react-icons/bs';

const GITHUB_LINK = 'https://github.com/woongsnote';

export default function Footer() {
  return (
    <footer>
      <p className="text-xs">
        © 2023. woongsnote All rights reserved.
        <br />
        built with Next.js | Developed by woongsnote
      </p>
      <a href={GITHUB_LINK} className="m-1" aria-label="move to github">
        <BsGithub size={24} color="gray" />
      </a>
    </footer>
  );
}
