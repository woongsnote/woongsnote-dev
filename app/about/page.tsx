import { ProfileImage } from '@/app/ui/profile';
import { PageHeader } from '../ui/layout/PageHeader';

export default function About() {
  return (
    <>
      <PageHeader
        title="About Me"
        description="안녕하세요. 프론트엔드 개발자 문지웅입니다."
      />
      <section className="flex flex-col md:flex-row items-center gap-8 p-4 mx-auto">
        <div className="basis-1/4">
          <ProfileImage />
        </div>
        <div className="flex gap-8 items-center">
          <p className="text-base lg:text-lg">
            안녕하세요. 프론트엔드 개발자 문지웅입니다. <br />
            <b>새로운 기술에 대한 호기심</b>과 <b>끊임없는 열정</b>을 가지고
            있습니다. 학습한 지식을 직접 구현한 블로그에 정리하고 공유함으로써
            지식 공유에도 기여하고 있습니다. <b>소통</b>과 <b>협업</b>도
            중요시합니다. 다양한 프로젝트 경험을 통해 프론트엔드와 백엔드
            개발자들과의 원활한 협업 방법과 개발 프로세스를 익혀왔습니다. 팀
            내에서 효과적인 커뮤니케이션과 역할 분담을 통해 일정 관리와 목표
            달성을 위한 체계적인 계획 수립 능력을 갖추고 있습니다. 이러한
            노력으로 프로젝트의 완성도가 높은 팀으로 평가받은 경험이 있습니다.
          </p>
        </div>
      </section>
      <section>{/* My Skills */}</section>
      <section>{/* My Experiences */}</section>
      <section>{/* Recent Projects */}</section>
    </>
  );
}
