module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false,
  },
  files: ["**/*.mjs"],
  extends: '@arcblock/eslint-config-base',
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
