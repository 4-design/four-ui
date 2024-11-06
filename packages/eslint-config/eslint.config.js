import { FlatCompat } from '@eslint/eslintrc'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'

const compat = new FlatCompat()

export default [
  ...compat.extends('eslint-config-google').map((config) => ({
    ...config,
    ignores: ['dist/**/*'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['dist/**/*', 'node_modules/**/*'],
    languageOptions: { parser: tsParser },
    plugins: {
      '@typescript-eslint': ts,
      import: importPlugin,
      react: reactPlugin,
    },
    rules: {
      ...ts.configs['recommended'].rules,
      ...ts.configs['eslint-recommended'].rules,
      semi: [
        'error',
        'never',
      ],
      quotes: [
        'error',
        'single',
      ],
      'require-jsdoc': 'off',
      'array-element-newline': [
        'error',
        'consistent',
      ],
      'object-curly-spacing': [
        'error',
        'always',
      ],
      'object-curly-newline': [
        'error',
        {
          consistent: true,
        },
      ],
      'quote-props': [
        'error',
        'as-needed',
      ],
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
        },
      ],
      'import/no-unresolved': 'off',
      'import/no-named-as-default-member': 'off',
      'import/namespace': [
        'off',
        { allowComputed: true },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroupsExcludedImportTypes: [
            'react',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '/**',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]
