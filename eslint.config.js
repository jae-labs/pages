import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['astro.config.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly'
      }
    }
  },
  {
    files: ['**/*.{js,mjs,ts,astro}'],
    rules: {
      'no-console': 'warn'
    }
  }
];
