import { Project, allProjects } from "contentlayer/generated";
import Container from "components/Container";
import PageHeader from "components/PageHeader";
import ProjectList from "components/ProjectList";
import { getSortedDataList } from "utils/getData";

export const metadata = {
  title: { absolute: "Projects | Woongsnote" },
};

export default function Projects() {
  const projects: Project[] = getSortedDataList(allProjects);
  return (
    <Container>
      <PageHeader
        title="Projects"
        description="사이드 & 토이 프로젝트들을 기록합니다."
      />
      <ProjectList projects={projects} />
    </Container>
  );
}
