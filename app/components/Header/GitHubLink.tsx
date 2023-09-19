import { BsGithub } from 'react-icons/bs';

const GITHUB_LINK = 'https://github.com/woongsnote';

export default function GitHubLink() {
  return (
    <a href={GITHUB_LINK} className="m-1" aria-label="move to github">
      <BsGithub size={30} />
    </a>
  );
}
