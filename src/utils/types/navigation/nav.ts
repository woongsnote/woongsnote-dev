import type { PageKey } from '@config/site-config';

export interface NavItem {
  label: string;
  href: string;
}
export type NavItemWithMeta = NavItem & {
  metaKey: PageKey;
};
