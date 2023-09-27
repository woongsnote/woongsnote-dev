import { Project, allProjects } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getSortedDataList } from '@/lib/utils';
import { PageHeader, ProjectList } from '@/components';
import { ImSpinner8 } from 'react-icons/im';

export const metadata: Metadata = {
  title: { absolute: 'Projects | Woongsnote' },
};

export default function Projects() {
  const projects: Project[] = getSortedDataList(allProjects);
  return (
    <>
      <PageHeader
        title="Projects"
        description="직접 구현한 프로젝트들입니다."
      />
      <Suspense
        fallback={
          <p className="flex flex-row">
            프로젝트 목록을 가져오는 중입니다...
            <ImSpinner8 className="animate-spin" />
          </p>
        }
      >
        <ProjectList projects={projects} />
      </Suspense>
    </>
  );
}
