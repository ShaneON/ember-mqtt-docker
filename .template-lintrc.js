'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'attribute-indentation': { 'open-invocation-max-len': 120 },
    'block-indentation': 'error',
    'eol-last': 'never',
    'inline-link-to': 'error',
    'linebreak-style': 'error',
    'modifier-name-case': 'error',
    'no-action-modifiers': 'error',
    'no-dynamic-subexpression-invocations': 'error',
    'no-element-event-actions': 'error',
    'no-model-argument-in-route-templates': 'error',
    'no-multiple-empty-lines': 'error',
    'no-mut-helper': 'error',
    'no-this-in-template-only-components': 'error',
    'no-trailing-spaces': 'error',
    'no-unnecessary-concat': 'error',
    quotes: 'double',
    'require-each-key': 'error',
    'require-form-method': 'error',
    'self-closing-void-elements': 'error',
  },
  overrides: [
    {
      files: ['app/components/**/*.hbs'],
      rules: { 'require-splattributes': 'error' },
    },
  ],
};
