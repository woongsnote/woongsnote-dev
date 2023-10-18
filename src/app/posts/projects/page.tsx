import { Project, allProjects } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getSortedDataList } from '@/lib/utils';
import {
  PageHeader,
  CardList as ProjectList,
  ListSkeleton,
} from '@/components';

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
      <Suspense fallback={<ListSkeleton listLength={projects.length} />}>
        <ProjectList articles={projects} type="project" />
      </Suspense>
    </>
  );
}
