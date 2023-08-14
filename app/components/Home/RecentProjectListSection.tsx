import { Project, allProjects } from 'contentlayer/generated';
import MainSectionHeader from './MainSectionHeader';
import ProjectList from '../Project/ProjectList';
import { getSortedDataList } from 'app/utils/getData';

const MAX_RECENT_PROJECTS = 2;
const PROJECT_SECTION_TITLE = '최신 프로젝트';
const PROJECT_SECTION_LINK = '/projects';
const PROJECT_SECTION_LABEL = 'ALL PROJECTS';

export default function RecentProjectListSection(): React.ReactElement {
  const recentProjects: Project[] = getSortedDataList(
    allProjects,
    MAX_RECENT_PROJECTS,
  );

  return (
    <section className="mt-8">
      <MainSectionHeader
        title={PROJECT_SECTION_TITLE}
        href={PROJECT_SECTION_LINK}
        label={PROJECT_SECTION_LABEL}
      />
      <ProjectList projects={recentProjects} />
    </section>
  );
}
