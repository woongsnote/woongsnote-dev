import type { TocHeading, TocNode } from '@/shared/types/toc/toc';

export const generateToc = (headings: TocHeading[]): TocNode[] => {
  const toc: TocNode[] = [];
  const parents = new Map<number, TocNode>();

  headings.forEach((heading) => {
    const node: TocNode = { ...heading, subHeadings: [] };

    // 현재 depth의 최신 노드를 부모 후보로 등록
    parents.set(node.depth, node);

    // h2는 최상위
    if (node.depth === 2) {
      toc.push(node);
      return;
    }

    // 바로 위 depth가 없을 수 있으니, 가장 가까운 상위 부모를 찾음
    for (let d = node.depth - 1; d >= 2; d--) {
      const parent = parents.get(d);
      if (parent) {
        parent.subHeadings.push(node);
        return;
      }
    }

    // 부모를 못 찾으면 유실 방지로 최상위에 붙임
    toc.push(node);
  });

  return toc;
};
