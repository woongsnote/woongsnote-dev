import { BsGithub } from 'react-icons/bs';

const GitHubLink = (): React.ReactElement => {
  return (
    <a href="https://github.com/woongsnote/woongsnote-dev" className="m-1">
      <BsGithub size={30} />
    </a>
  );
};

export default GitHubLink;
