/**@type {import("prettier").Config} */
module.exports = {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  endOfLine: 'lf',
  trailingComma: 'es5',
  astroOrganizeImportsMode: 'All',
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-astro-organize-imports',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
