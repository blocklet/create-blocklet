module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: 'tsconfig.json',
  },
  globals: {
    logger: true,
  },
};
