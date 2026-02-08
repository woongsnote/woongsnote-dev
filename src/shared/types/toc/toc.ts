export type TocHeading = {
  depth: number;
  slug: string;
  text: string;
};

export type TocNode = TocHeading & {
  subHeadings: TocNode[];
};
