import { Project, allProjects } from 'contentlayer/generated';
import MainSectionHeader from './MainSectionHeader';
import { getSortedDataList } from 'app/lib/utils';
import { ProjectList } from '../Project';

const MAX_RECENT_PROJECTS = 2;
const PROJECT_SECTION_TITLE = '최신 프로젝트';
const PROJECT_SECTION_LINK = '/projects';
const PROJECT_SECTION_LABEL = '모든 프로젝트';

export default function RecentProjectListSection() {
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
