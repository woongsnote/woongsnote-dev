import type { TocHeading, TocNode } from '@/utils/types';

export const generateToc = (headings: TocHeading[]): TocNode[] => {
  const toc: TocNode[] = [];
  const parents = new Map<number, TocNode>();

  headings.forEach((heading) => {
    const node: TocNode = { ...heading, subHeadings: [] };
    parents.set(node.depth, node);

    if (node.depth === 2) {
      toc.push(node);
    } else {
      parents.get(node.depth - 1)?.subHeadings.push(node);
    }
  });

  return toc;
};
