import { Project, allProjects } from 'contentlayer/generated';
import { getSortedDataList } from '@/lib/utils';
import { MainSectionHeader, ProjectList } from '@/components';

const MAX_RECENT_PROJECTS = 2;

export default function RecentProjectListSection() {
  const recentProjects: Project[] = getSortedDataList(
    allProjects,
    MAX_RECENT_PROJECTS,
  );

  return (
    <section className="my-4 w-full mx-auto">
      <MainSectionHeader
        title="최신 프로젝트"
        href="/projects"
        label="모든 프로젝트"
      />
      <ProjectList projects={recentProjects} />
    </section>
  );
}
