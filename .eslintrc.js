module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  
  ignorePatterns: ['.eslintrc.js'],

  rules: {
    quotes: ['warn', 'single', { avoidEscape: true }],

    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'object-curly-spacing': ['error', 'always'],

    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'exports': 'always-multiline',
      'imports': 'always-multiline',
    }],

    'semi': ['error', 'never'],

    "no-multiple-empty-lines": ['error', {
      'max': 2,
    }],
  },
};
