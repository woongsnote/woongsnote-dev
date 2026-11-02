---
title: '1인 개발 프로젝트에서 dev 브랜치를 제거한 이유'
description: '개인 프로젝트의 main/dev 브랜치 운영을 main 단일 브랜치로 변경한 이유와 GitHub Actions, 커밋 및 PR 운영 규칙을 정리했다.'
publishedDate: 2026-11-02
category: 'Project'
tags: ['Git', 'Blog']
---

## 개요

개인 블로그인 Woongsnote를 관리하면서 오랫동안 `main`과 `dev` 브랜치를 분리해서 사용했다.

`dev`에서 기능을 개발하고, 작업이 완료되면 Pull Request를 통해 `main`으로 병합하는 방식이었다.

일반적인 개발 워크플로와 비슷한 구조였지만, 혼자 개발하는 프로젝트에서 이 방식을 계속 유지할 필요가 있는지 고민하게 되었다.

최근 개발 환경을 정리하면서 Git 브랜치 운영 방식도 함께 검토했고, 최종적으로 `dev` 브랜치를 제거하고 `main` 중심으로 운영하기로 결정했다.

이번 글에서는 기존 브랜치 운영 방식과 변경 이유, 그리고 GitHub Actions 설정까지 정리한다.

## 기존 브랜치 운영 방식

기존 Woongsnote는 두 개의 장기 유지 브랜치를 사용했다.

- `main`: 실제 배포에 사용하는 브랜치
- `dev`: 개발 및 검증을 진행하는 브랜치

작업 흐름은 다음과 같았다.

```text title="기존 워크플로"
dev
 ├─ 기능 개발
 ├─ 커밋 및 푸시
 ├─ GitHub Actions 검증
 └─ Pull Request
        ↓
      main
        ↓
   Vercel 배포
```

개발 작업과 배포 환경을 분리할 수 있다는 장점이 있었다.

하지만 프로젝트를 혼자 관리하다 보니 브랜치를 분리해서 얻는 이점보다 관리 과정이 더 크게 느껴지기 시작했다.

## dev 브랜치가 정말 필요할까?

브랜치를 분리하는 것 자체가 잘못된 방식은 아니다.

여러 사람이 동시에 작업하거나 개발 환경과 운영 환경을 명확하게 구분해야 하는 프로젝트라면 충분히 의미가 있다.

다만 Woongsnote는 혼자 개발하고 관리하는 개인 블로그다.

작은 UI 수정이나 콘텐츠 변경도 `dev`에 먼저 반영한 뒤 다시 `main`으로 병합해야 했다.

그 과정에서 브랜치 동기화, Pull Request 생성, 병합 등의 절차가 반복됐다.

특히 기능 개발보다 콘텐츠 작성과 유지보수가 중심인 프로젝트에서 두 개의 장기 브랜치를 계속 유지하는 것이 꼭 필요한지는 의문이었다.

결국 브랜치를 많이 유지하는 것보다 **프로젝트에 필요한 검증 과정을 유지하면서 작업 흐름을 단순화하는 것**이 더 중요하다고 판단했다.

## main 단일 브랜치로 변경

최종적으로 `main`을 유일한 장기 유지 브랜치로 사용하기로 했다.

```text title="변경 후 워크플로"
main
 ├─ 기능 및 콘텐츠 수정
 ├─ 커밋 및 푸시
 ├─ GitHub Actions 검증
 └─ Vercel 배포
```

이제 일반적인 작업은 `main`에서 직접 진행할 수 있다.

다만 단일 브랜치 운영이 모든 작업을 무조건 `main`에서 진행한다는 뜻은 아니다.

변경 범위가 크거나 사전 검토가 필요한 작업은 임시 브랜치를 생성하고 Pull Request를 사용하는 방식도 가능하다.

중요한 것은 `dev`처럼 지속적으로 동기화해야 하는 별도의 개발 브랜치를 없애는 것이다.

## GitHub Actions 설정 변경

브랜치 전략을 변경하면서 GitHub Actions의 실행 조건도 수정했다.

기존에는 `dev` 브랜치에 푸시하거나 `dev`, `main`을 대상으로 Pull Request가 생성되면 검증을 실행했다.

```yaml title="기존 validate.yml"
on:
  push:
    branches: [dev]
  pull_request:
    branches: [dev, main]
  workflow_dispatch:
```

`dev` 브랜치를 제거한 뒤에도 이 설정을 유지하면 `main`에 직접 푸시했을 때 검증이 자동 실행되지 않는다.

따라서 다음과 같이 변경했다.

```yaml title="변경 후 validate.yml"
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

이제 `main`에 푸시하거나 `main`을 대상으로 Pull Request를 생성하면 검증이 실행된다.

기존 테스트 스크립트는 그대로 유지했다.

```json title="package.json"
{
  "scripts": {
    "validate": "npm run format:check && npm run test:content && npm run build && npm run test:build && npm run test:browser"
  }
}
```

다만 `main`에 직접 푸시하는 방식에서는 GitHub Actions 검증이 푸시 이후에 실행된다.

따라서 로컬에서 `npm run validate`를 먼저 실행하고, 변경 범위가 큰 작업은 PR에서 검증을 통과한 뒤 병합하는 방식으로 운영할 예정이다.

## dev 브랜치 정리

이번 Node.js 개발 환경 전환 작업을 마지막 `dev → main` Pull Request로 사용했다.

기존 브랜치에서 필요한 변경 사항을 반영한 다음 GitHub Actions의 검증 결과를 확인하고 `main`으로 병합했다.

이후 `dev` 브랜치를 삭제하고 로컬 저장소도 정리했다.

```bash title="로컬 브랜치 정리"
git switch main
git pull --ff-only origin main
git branch -d dev
git fetch --prune
```

이렇게 하면 기존에 사용하던 장기 개발 브랜치를 정리하고 `main`을 중심으로 작업할 수 있다.

## 앞으로의 Git 운영 규칙

브랜치를 단순화하면서 커밋과 Pull Request 작성 규칙도 함께 정리했다.

### 커밋 메시지

커밋 메시지는 영어와 Conventional Commits 형식을 사용한다.

```text title="커밋 메시지 예시"
feat: add new feature
fix: resolve navigation issue
refactor: simplify component structure
chore: update development environment
docs: publish new blog posts
```

작업 유형을 접두사로 구분하고, 메시지는 한 줄로 간결하게 작성한다.

### Pull Request

Pull Request도 불필요하게 긴 설명을 작성하지 않기로 했다.

제목은 커밋 메시지와 같은 형식을 사용하고, 본문에는 변경 내용과 검증 결과 정도만 남긴다.

```text title="PR 본문 예시"
- [x] Update project configuration.
- [x] Verify local build.
- [x] Pass GitHub Actions validation.
```

개인 프로젝트에서는 작업의 목적과 결과를 명확하게 남기는 것만으로도 충분하다고 판단했다.

Labels, Milestones, Projects 등의 GitHub 기능도 필요해지는 시점에 도입할 예정이다.

## 마무리

이번 변경은 새로운 Git 전략을 도입했다기보다, 기존 운영 방식에서 불필요한 단계를 줄인 작업에 가깝다.

`main`과 `dev`를 분리해서 사용했던 경험도 의미가 있었지만, 현재의 Woongsnote에는 장기 브랜치를 하나만 유지하는 방식이 더 적합하다고 판단했다.

앞으로는 `main`을 중심으로 개발하고, 필요할 때만 임시 브랜치와 Pull Request를 사용할 예정이다.

Git 워크플로는 복잡할수록 좋은 것이 아니라, 프로젝트의 규모와 작업 방식에 맞는 것이 중요하다고 생각한다.

이번 정리를 계기로 브랜치 관리보다 실제 기능 개발과 글 작성에 더 집중할 수 있기를 기대한다.

---

### 관련 자료

- [GitHub — About branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/about-branches)
- [GitHub Actions — Triggering a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)
- [Conventional Commits](https://www.conventionalcommits.org/)