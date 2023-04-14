import { allProjects } from "@/.contentlayer/generated";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { compareDesc } from "date-fns";

export const metadata = {
  title: { absolute: "Projects | Woongsnote" },
};

export default function Projects() {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <Container>
      <PageHeader
        title="Projects"
        description="사이드 & 토이 프로젝트들을 기록합니다."
      />
      <div className="mx-4 grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </Container>
  );
}
