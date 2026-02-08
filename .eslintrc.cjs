// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    /* ===============================
       Import sort
       =============================== */
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1) astro:, node:
          ['^astro:', '^node:'],

          // 2) npm packages
          ['^@?\\w'],

          // 3) app
          ['^@/app(/.*|$)'],

          // 4) widgets / features
          ['^@/widgets(/.*|$)', '^@/features(/.*|$)'],

          // 5) shared / assets
          ['^@/shared(/.*|$)', '^@/assets(/.*|$)'],

          // 6) relative
          [
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],

          // 7) type imports (TS)
          ['^\\u0000'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    /* ===============================
       Type import 규칙
       =============================== */
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
  },
};
