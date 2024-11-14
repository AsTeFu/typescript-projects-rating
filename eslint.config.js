import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', '**/node_modules'],
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'max-len': ['error', { code: 90 }],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/self-closing-comp': 'error',
      quotes: [
        'warn',
        'single',
        { avoidEscape: true, allowTemplateLiterals: false, allowedDepth: 2 },
      ],
      'react/react-in-jsx-scope': 'off',
      'import/no-default-export': 'error',
      'import/no-unresolved': 'off',
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: true, rootDir: 'src', prefix: '@', allowedDepth: 2 },
      ],
      'react/jsx-boolean-value': ['error'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-leaked-render': ['error'],
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  {
    files: ['*.config.{js,ts}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react'],
            ['^[@a-zA-Z]'],
            [String.raw`^\./*`, String.raw`^./\w+$`, String.raw`^\.\./*`],
            ['(.json)'],
            ['(.svg|.png)'],
            ['(.css|.scss)'],
          ],
        },
      ],
    },
  },
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-null': 'off',
    },
  },
  ...pluginQuery.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
);
