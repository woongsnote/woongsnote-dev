import {StoryblokStory} from 'storyblok-generate-ts'

export interface AllArticlesStoryblok {
  headline?: string;
  _uid: string;
  component: "all-articles";
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface ArticleStoryblok {
  image?: AssetStoryblok;
  title?: string;
  teaser?: string;
  category?: "" | "Tech" | "Diary" | "Project";
  pubDate?: string;
  tags?: ("" | "Next.js" | "React" | "TypeScript" | "Resend" | "React Email")[];
  content?: RichtextStoryblok;
  _uid: string;
  component: "article";
  [k: string]: any;
}

export interface CodeBlockStoryblok {
  _uid: string;
  component: "code-block";
  [k: string]: any;
}

export interface FeatureStoryblok {
  image?: AssetStoryblok;
  title?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | CodeBlockStoryblok
    | FeatureStoryblok
    | GridStoryblok
    | HeroStoryblok
    | LatestArticlesStoryblok
    | PageStoryblok
    | SectionStoryblok
    | TeaserStoryblok
  )[];
  _uid: string;
  component: "grid";
  [k: string]: any;
}

export interface HeroStoryblok {
  _uid: string;
  component: "hero";
  [k: string]: any;
}

export interface LatestArticlesStoryblok {
  articles?: (StoryblokStory<ArticleStoryblok> | string)[];
  _uid: string;
  component: "latest-articles";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | AllArticlesStoryblok
    | ArticleStoryblok
    | CodeBlockStoryblok
    | FeatureStoryblok
    | GridStoryblok
    | HeroStoryblok
    | LatestArticlesStoryblok
    | PageStoryblok
    | SectionStoryblok
    | TeaserStoryblok
  )[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface SectionStoryblok {
  title?: string;
  content?: RichtextStoryblok;
  _uid: string;
  component: "section";
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: any;
}
