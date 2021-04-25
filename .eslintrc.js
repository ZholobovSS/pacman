module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    'no-console': 0,
    'max-classes-per-file': 0,
    'max-len': ['error', { code: 120 }],
    'no-underscore-dangle': 0,
  },
}
