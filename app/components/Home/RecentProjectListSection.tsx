import { Project, allProjects } from 'contentlayer/generated';
import MainSectionHeader from './MainSectionHeader';
import { getSortedDataList } from 'app/lib/utils';
import { ProjectList } from '../Project';

const MAX_RECENT_PROJECTS = 2;

export default function RecentProjectListSection() {
  const recentProjects: Project[] = getSortedDataList(
    allProjects,
    MAX_RECENT_PROJECTS,
  );

  return (
    <section className="mt-8">
      <MainSectionHeader
        title="최신 프로젝트"
        href="/projects"
        label="모든 프로젝트"
      />
      <ProjectList projects={recentProjects} />
    </section>
  );
}
