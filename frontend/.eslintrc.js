// module.exports = {
//   parserOptions: {
//     project: 'tsconfig.json',
//     tsconfigRootDir: __dirname,
//     sourceType: 'module',
//   },
//   // ... rest
// };

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks'],
  rules: {
    '@typescript-eslint/rule-name': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { ignoreRestSiblings: true, args: 'none', destructuredArrayIgnorePattern: '^_' },
    ],
    'jest/no-conditional-expect': 'off',
    'no-extra-boolean-cast': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    'react/no-unescaped-entities': 'off',
    'no-case-declarations': 'off',
    'no-prototype-builtins': 'off',
    'no-useless-escape': 'off',
    'no-useless-catch': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-async-promise-executor': 'off',
    'testing-library/no-await-sync-query': 'off',
    'prefer-const': 'off',
    'no-dupe-else-if': 'off',
    'no-constant-condition': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
