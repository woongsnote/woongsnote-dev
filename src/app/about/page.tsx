import Image from 'next/image';

export default function page() {
  return (
    <section className="flex flex-col items-center gap-8 py-4">
      <h2 className="text-xl lg:text-4xl font-bold">About Me</h2>
      <div className="flex flex-row gap-2 items-center">
        <Image
          src={'/profile.png'}
          width={300}
          height={300}
          alt="Profile"
          className="rounded-lg"
        />
        <p className="text-base lg:text-lg">
          <b>새로운 기술에 대한 호기심</b>과 <b>끊임없는 열정</b>을 가지고
          있습니다. <br /> 학습한 지식을 직접 구현한 블로그에 정리하고
          공유함으로써 지식 공유에도 기여하고 있습니다.
          <br />
          <br />
          <b>소통</b>과 <b>협업</b>도 중요시합니다. <br /> 다양한 프로젝트
          경험을 통해 프론트엔드와 백엔드 개발자들과의 원활한 협업 방법과 개발
          프로세스를 익혀왔습니다. 팀 내에서 효과적인 커뮤니케이션과 역할 분담을
          통해 일정 관리와 목표 달성을 위한 체계적인 계획 수립 능력을 갖추고
          있습니다. 이러한 노력으로 프로젝트의 완성도가 높은 팀으로 평가받은
          경험이 있습니다.
        </p>
      </div>
    </section>
  );
}
