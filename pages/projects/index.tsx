import Page from "../../components/page";
import Title from "../../components/page/title";
import ProjectItem from "../../components/projects/project";

const Projects = () => {
  return (
    <Page>
      <Title
        pageTitle="Projects"
        pageDescription="사이드&토이 프로젝트를 기록합니다"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 xl:gap-8">
        <ProjectItem
          imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
          title="기술 블로그"
          description="NextJs 기술 블로그"
        />
        <ProjectItem
          imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
          title="방구석 평론가"
          description="영화 커뮤니티"
        />
        <ProjectItem
          imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
          title="북적북적"
          description="앱을 웹으로 클론코딩"
        />
        <ProjectItem
          imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
          title="WeRef"
          description="개발 관련 학습 커뮤니티"
        />
      </div>
    </Page>
  );
};
export default Projects;
