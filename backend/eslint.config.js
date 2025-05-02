import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
  },
  { files: ['**/*.json5'], plugins: { json }, language: 'json/json5' },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css' },
  {
    files: ['**/*'],
    rules: {
      'linebreak-style': ['error', 'unix'], // 'unix' = LF (\n)
    },
  },
]);
