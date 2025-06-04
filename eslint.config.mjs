import { dirname } from 'path';

import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: await import('eslint-plugin-import'),
      'simple-import-sort': await import('eslint-plugin-simple-import-sort'),
    },
    rules: {
      'import/no-unresolved': 'error',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike', // interface, type alias, enum, class 등
          format: ['PascalCase'],
        },
      ],
      'react/jsx-pascal-case': [
        'warn',
        {
          allowAllCaps: false,
          ignore: [],
        },
      ],

      // ▶ import 정렬 자동화 (Prettier 플러그인과 함께 사용)
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. 리액트·외부 라이브러리
            ['^react', '^@?\\w'],

            // 2. 루트 전역 shared
            ['^@/shared'],

            // 3. 스코프별 shared
            ['^@/(?:super-admin|nook)/shared'],

            // 4. 스코프별 entities
            ['^@/(?:super-admin|nook)/[^/]+/entities'],

            // 5. 스코프별 features
            ['^@/(?:super-admin|nook)/[^/]+/features'],

            // 6. 스코프별 pages
            ['^@/(?:super-admin|nook)/[^/]+/pages'],

            // 7. 스코프별 app
            ['^@/(?:super-admin|nook)/[^/]+/app'],

            // 8. 상위 디렉터리 import (`../`)
            ['^\\.\\./'],

            // 9. 동일 디렉터리 import (`./`)
            ['^\\.\\/'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // ▶ 단방향 참조 금지
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // features 레이어는 app/, pages/를 참조 금지
            { target: './src/*/features/**', from: './src/*/app/**' },
            { target: './src/*/features/**', from: './src/*/pages/**' },

            // pages 레이어는 app/을 참조 금지
            { target: './src/*/pages/**', from: './src/*/app/**' },

            // entities 레이어는 app/, pages/, features/ 참조 금지
            { target: './src/*/entities/**', from: './src/*/app/**' },
            { target: './src/*/entities/**', from: './src/*/pages/**' },
            { target: './src/*/entities/**', from: './src/*/features/**' },

            // 각 스코프의 shared 레이어는 상위 레이어 전부 참조 금지
            { target: './src/*/shared/**', from: './src/*/app/**' },
            { target: './src/*/shared/**', from: './src/*/pages/**' },
            { target: './src/*/shared/**', from: './src/*/features/**' },
            { target: './src/*/shared/**', from: './src/*/entities/**' },

            // 루트 shared는 그 어떤 스코프(src/admin, src/dpp, src/cessim)에서도 참조 금지
            { target: './src/shared/**', from: './src/*/**' },
          ],
        },
      ],

      // ▶ 코드 품질 관리 규칙
      'no-unused-vars': 'off', // TypeScript의 @typescript-eslint/no-unused-vars로 대체
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
];

export default eslintConfig;
