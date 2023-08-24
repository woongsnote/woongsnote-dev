import { BsGithub } from 'react-icons/bs';

const GITHUB_LINK = 'https://github.com/woongsnote/woongsnote-dev';

export default function GitHubLink() {
  return (
    <a href={GITHUB_LINK} className="m-1">
      <BsGithub size={30} />
    </a>
  );
}
