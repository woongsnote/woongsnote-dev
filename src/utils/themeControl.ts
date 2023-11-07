export const getCurrentTheme = (): string => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')!;
  }
  if (window.matchMedia('(prefers-color-schema: dark)').matches) {
    return 'dark';
  }
  return 'light';
};
