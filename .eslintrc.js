module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 关于state和vue，允许直接属性操作
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['state', 'Vue', 'item', 'i'],
    }],
    'max-len': 'off',
    'no-underscore-dangle': ["error", {
      "allowAfterThis": true
    }]
  },
};
