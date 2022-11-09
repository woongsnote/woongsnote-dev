import React from "react";
import SectionHeader from "./SectionHeader";
import LatestProjectItem from "./LatestProjectItem";

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
          <LatestProjectItem
            imageUrl="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600"
            title="New trends in Tech"
            description="July 19, 2021"
          />
          <LatestProjectItem
            imageUrl="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600"
            title="New trends in Tech"
            description="July 19, 2021"
          />
        </div>
      </div>
    </section>
  );
}
