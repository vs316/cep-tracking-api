import { fileURLToPath } from 'url';
import { dirname } from 'path';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptEslintParser from '@typescript-eslint/parser'; // Import the parser

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Specify the file types to lint
    ignores: ['.eslintrc.js'], // Patterns to ignore
    languageOptions: {
      parser: typescriptEslintParser, // Use the imported parser directly
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 0,
    },
  },
];
