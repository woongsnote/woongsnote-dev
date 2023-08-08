import { Project, allProjects } from 'contentlayer/generated';
import { PageHeader } from 'app/components/Page';
import { ProjectList } from 'app/components/Project';
import { getSortedDataList } from 'app/utils/getData';

const PROJECTS_PAGE_TITLE = 'Projects';
const PROJECTS_PAGE_DESCRIPTION = '직접 구현한 프로젝트들을 기록합니다.';

export const metadata = {
  title: { absolute: 'Projects | Woongsnote' },
};

export default function Projects() {
  const projects: Project[] = getSortedDataList(allProjects);
  return (
    <>
      <PageHeader
        title={PROJECTS_PAGE_TITLE}
        description={PROJECTS_PAGE_DESCRIPTION}
      />
      <ProjectList projects={projects} />
    </>
  );
}
