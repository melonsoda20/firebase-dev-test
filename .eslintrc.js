module.exports = {
  globals: {
    'google': 'readonly'
  },
  plugins: [],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['R Scripts', 'public/build'],
  rules: {
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'template-curly-spacing': ['error', 'always'],
    'no-inner-declarations': 'off',
    'require-atomic-updates': 'off',
    'no-async-promise-executor': 'off',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '[cycle|executingUser]'
      }
    ],
    'no-empty': ['error', { allowEmptyCatch: true }],
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'no-console': [
      'error',
      {
        allow: [ 'debug', 'warn', 'error', 'log' ]
      }
    ]
  }
};
