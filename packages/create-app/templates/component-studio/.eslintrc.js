const { join } = require('path');

module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/indent': 'off',
    'no-return-assign': 'off',
    'no-nested-ternary': 'off',
    'no-await-in-loop': 'warn',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-array-index-key': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'react/no-is-mounted': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/function-component-definition': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};
