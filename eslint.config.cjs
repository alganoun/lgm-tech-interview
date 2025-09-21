// Flat config ESLint v9 — TypeScript (non type-checked) + Prettier
const prettier = require('eslint-config-prettier');
const tseslint = require('typescript-eslint');

module.exports = [
  { ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'] },
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'prefer-const': 'warn',
    },
  },
  prettier,
];
