/**@type {import("prettier").Config} */
module.exports = {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma:'es5',
  overrides: [
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
};
