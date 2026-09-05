// src/lib/theme.ts
// ─── 테마 식별자 SSOT ───
// daisyUI 테마명, localStorage 키, 브라우저 theme-color를 한 곳에서 관리.

export const THEME = {
  dark: 'woong-dark',
  light: 'woong-light',
  storageKey: 'theme',
  colors: {
    light: '#f8fafd',
    dark: '#121212',
  },
} as const;

export type ThemeName = typeof THEME.dark | typeof THEME.light;
