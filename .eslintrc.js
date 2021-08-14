module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "object-curly-newline": [0],
    "no-plusplus": [0],
    "no-bitwise": [0],
    "no-unused-expressions": [0],
    "no-return-assign": [0],
    "no-param-reassign": [0],
    "implicit-arrow-linebreak": [0],
    "function-paren-newline": [0],
  },
};
