import { Project, allProjects } from 'contentlayer/generated';
import MainSectionHeader from '../layouts/MainSectionHeader';
import ProjectList from './ProjectList';
import { getSortedDataList } from 'utils/getData';

const MAX_RECENT_PROJECTS = 2;

const RecentProjectListSection = () => {
  const recentProjects: Project[] = getSortedDataList(
    allProjects,
    MAX_RECENT_PROJECTS
  );

  return (
    <section className="mx-auto mt-10">
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
