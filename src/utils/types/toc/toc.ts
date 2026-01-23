export type TocHeading = {
  text: string;
  depth: number;
  slug: string;
};

export type TocNode = TocHeading & {
  subHeadings: TocNode[];
};
