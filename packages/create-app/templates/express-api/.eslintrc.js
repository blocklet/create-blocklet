module.exports = {
    root: true,
    extends: '@arcblock/eslint-config',
    globals: {
      logger: true,
    },
    rules: {
      'no-console': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
          message: 'Unexpected property on console object was called',
        },
      ],
    },
    settings: {
      react: {
        version: '999.999.999',
      },
    },
  };
  