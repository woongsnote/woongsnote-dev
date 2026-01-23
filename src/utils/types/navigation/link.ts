export type SocialLinkType = 'github' | 'linkedin' | 'email' | 'rss';

export interface SocialLink {
  type: SocialLinkType;
  url: string;
}
