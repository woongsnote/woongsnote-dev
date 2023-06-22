import { Project, allProjects } from "contentlayer/generated";
import PageHeader from "app/layouts/PageHeader";
import ProjectList from "app/components/ProjectList";
import { getSortedDataList } from "utils/getData";

export const metadata = {
  title: { absolute: "Projects | Woongsnote" },
};

export default function Projects() {
  const projects: Project[] = getSortedDataList(allProjects);
  return (
    <>
      <PageHeader
        title="Projects"
        description="사이드 & 토이 프로젝트들을 기록합니다."
      />
      <ProjectList projects={projects} />
    </>
  );
}
