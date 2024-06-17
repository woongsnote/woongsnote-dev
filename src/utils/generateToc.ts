import type { TocHeadings } from './types';

export function generateToc(headings: TocHeadings[]) {
  const toc: TocHeadings[] = [];
  const parentHeadings = new Map();
  headings.forEach((h) => {
    const heading = { ...h, subHeadings: [] };
    parentHeadings.set(heading.depth, heading);
    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subHeadings.push(heading);
    }
  });
  return toc;
}
