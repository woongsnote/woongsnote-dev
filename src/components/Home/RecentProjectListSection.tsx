import { Project, allProjects } from 'contentlayer/generated';
import { getSortedDataList } from '@/lib/utils';
import { MainSectionHeader, CardList as ProjectList } from '@/components';

const MAX_RECENT_PROJECTS = 2;

export default function RecentProjectListSection() {
  const recentProjects: Project[] = getSortedDataList(
    allProjects,
    MAX_RECENT_PROJECTS,
  );

  return (
    <section className="mt-8 w-full mx-auto p-4 lg:p-0">
      <MainSectionHeader
        title="최신 프로젝트"
        href="/projects"
        label="모든 프로젝트"
      />
      <ProjectList articles={recentProjects} type="project" />
    </section>
  );
}
