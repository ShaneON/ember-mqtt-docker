'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'ember/computed-property-getters': [2, 'always'],
    'ember/alias-model-in-controller': 2,
    'ember/no-empty-attrs': 2,
    'ember/no-html-safe': 2,
    'ember/require-fetch-import': 2,
    'ember/no-unnecessary-index-route': 2,
    'ember/route-path-style': 2,
    'ember/no-unnecessary-service-injection-argument': 2,
    'ember/order-in-components': 2,
    'ember/order-in-controllers': 2,
    'ember/order-in-models': 2,
    'ember/order-in-routes': 2,
    'ember/no-current-route-name': 2,
    'ember/no-replace-test-comments': 2,
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
      },
    },
    {
      // Test files:
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
