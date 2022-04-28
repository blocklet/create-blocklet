module.exports = {
  root: true,
  plugins: ['solid'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:solid/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
