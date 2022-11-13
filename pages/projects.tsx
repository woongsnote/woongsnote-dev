import Layout from "../components/Layout";
import ProjectItem from "../components/projects/ProjectItem";

export default function Projects() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="px-4 md:px-8 mx-auto">
          <div className="my-4">
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="my-2">사이드&토이 프로젝트를 기록합니다</p>
          </div>
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
        </div>
      </div>
    </Layout>
  );
}
