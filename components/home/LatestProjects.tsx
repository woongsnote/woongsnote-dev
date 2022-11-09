import React from "react";
import SectionHeader from "./SectionHeader";
import ProjectItem from "../projects/ProjectItem";

export default function LatestProjects() {
  return (
    <section className="mt-4">
      <div className="px-4 md:px-8 mx-auto">
        <SectionHeader
          title="최신 프로젝트"
          linkTitle="전체보기"
          linkAddress="/projects"
        />

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 xl:gap-8 mt-3">
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
        </div>
      </div>
    </section>
  );
}
