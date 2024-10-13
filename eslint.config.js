import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': ['error'],
      'space-before-blocks': ['error', 'always'],
      'no-redeclare': ['error'],
      'prefer-const': ['warn'],
      'max-len': ['error', { code: 173 }],
      'space-infix-ops': ['error'],
      'no-console': ['warn'],
      'no-inner-declarations': ['error'],
      curly: ['error', 'all'],
      'comma-dangle': ['error', 'never'],
      'one-var': ['error', 'never'],
      'func-names': ['warn']
    }
  }
);
