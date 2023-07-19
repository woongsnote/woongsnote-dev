import { Project, allProjects } from 'contentlayer/generated';
import MainSectionHeader from '../MainSectionHeader';
import ProjectList from '../Project/ProjectList';
import { getSortedDataList } from 'app/utils/getData';

const MAX_RECENT_PROJECTS = 2;

const RecentProjectListSection = (): React.ReactElement => {
  const recentProjects: Project[] = getSortedDataList(
    allProjects,
    MAX_RECENT_PROJECTS,
  );

  return (
    <section className="mt-10">
      <MainSectionHeader
        title={'최신 프로젝트'}
        href={'/projects'}
        label={'ALL PROJECTS'}
      />
      <hr />
      <ProjectList projects={recentProjects} />
    </section>
  );
};

export default RecentProjectListSection;
