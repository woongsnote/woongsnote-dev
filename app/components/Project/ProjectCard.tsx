import Link from 'next/link';
import { Project } from 'contentlayer/generated';
import CardHeader from '../Card/CardHeader';
import CardContent from '../Card/CardContent';
import CardLayout from '../Card/CardLayout';

const ProjectCard = ({
  slug,
  coverImage,
  title,
  description,
  tags,
}: Project): React.ReactElement => (
  <Link href={`/projects/${slug}`} className="group">
    <CardLayout>
      <CardHeader coverImage={coverImage} title={title} />
      <CardContent title={title} description={description} tags={tags} />
    </CardLayout>
  </Link>
);

export default ProjectCard;
