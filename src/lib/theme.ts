// src/lib/theme.ts
// ─── 테마 식별자 SSOT ───
// daisyUI 테마명, localStorage 키, 가능한 값 타입을 한 곳에서 관리.

export const THEME = {
  dark: 'woong-dark',
  light: 'woong-light',
  storageKey: 'theme',
  colors: {
    light: '#eceff2',
    dark: '#121417',
  },
} as const;

export type ThemeName = typeof THEME.dark | typeof THEME.light;
