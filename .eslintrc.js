module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false,
  },
  extends: '@arcblock/eslint-config',
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['^setupProxy\\.js$'],
      },
    ],
  },
};
