import { Project, allProjects } from 'contentlayer/generated';
import { Suspense } from 'react';
import { getSortedDataList } from 'app/lib/utils';
import { PageHeader } from 'app/components/Page';
import { ProjectList } from 'app/components/Project';

export const metadata = {
  title: { absolute: 'Projects | Woongsnote' },
};

export default function Page() {
  const projects: Project[] = getSortedDataList(allProjects);
  return (
    <>
      <PageHeader
        title="Projects"
        description="직접 구현한 프로젝트들의 기록입니다."
      />
      <Suspense fallback={<>Loading...</>}>
        <ProjectList projects={projects} />
      </Suspense>
    </>
  );
}
