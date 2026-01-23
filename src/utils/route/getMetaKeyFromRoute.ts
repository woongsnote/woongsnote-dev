// src/utils/getMetaKeyFromRoute.ts
import { ROUTE_META_MAP } from '@config/route-meta';

export function getMetaKeyFromRoute(pathname: string) {
  return ROUTE_META_MAP[pathname];
}
