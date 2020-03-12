module.exports = {
  extends: [
    'plugin:vue/base',
    'eslint:recommended',
    '@vue/airbnb',
    'plugin:jest/recommended',
    '@vue/prettier'
  ],
  plugins: ['prettier', 'simple-import-sort', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  }
};
