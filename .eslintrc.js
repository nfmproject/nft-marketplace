//Path: /.eslintrc.js

module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'array-bracket-spacing': ['error', 'never'],
    'no-use-before-define': ['warn', { functions: true, classes: true }],
    'no-param-reassign': ['warn'],
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    //You can override any rules you want
  },
  env: {
    browser: true,
    jest: true,
  },
};
