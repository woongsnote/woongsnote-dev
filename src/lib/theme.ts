/**
 * Theme configuration
 *
 * daisyUI theme names, localStorage key,
 * and browser theme colors.
 */

export const THEME = {
  dark: 'woong-dark',
  light: 'woong-light',

  storageKey: 'theme',

  colors: {
    light: '#F8FAFD',
    dark: '#25272C',
  },
} as const;

export type ThemeName = typeof THEME.dark | typeof THEME.light;
