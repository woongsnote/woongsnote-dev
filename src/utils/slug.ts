export const slugify = (text: string): string => {
  return text
    .toString()
    .replace(/\s+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const deSlugify = (text: string): string => {
  return text.toString().replace(/-/g, ' ');
};
