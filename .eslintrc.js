module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {},
  rules: {
    'vue/max-attributes-per-line': [2, {
      singleline: 10,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      before: true,
      after: true,
    }],
    indent: [2, 2, {
      SwitchCase: 1,
    }],
    'func-names': ['error', 'never'],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-param-reassign': 'off',
    'max-len': ['warn', 120],
    'prefer-destructuring': ['error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
    ],
    'import/no-cycle': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': ['error', 'never', {
      ignorePackages: true,
      pattern: {
        vue: 'always',
      },
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
