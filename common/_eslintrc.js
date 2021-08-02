module.exports = {
  parser: 'babel-eslint',
  extends: '@arcblock/eslint-config',
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
    jest: true,
  },
  globals: {
    logger: true,
  },
};
