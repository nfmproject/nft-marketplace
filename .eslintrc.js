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
    "no-console": "off",
    "import/prefer-default-export": "off",
    "prefer-template": "off",
    "react/prop-types": "off",
    "operator-linebreak": "off",
    "max-len": "off",
    "destructuring-assignment": "off",
    "react/destructuring-assignment": "off",
    "no-underscore-dangle": "off",
    "import/no-cycle": "off",
    "no-restricted-syntax": "off",
    "consistent-return": "off",
    "no-await-in-loop": "off",
    //You can override any rules you want
  },
  env: {
    browser: true,
    jest: true,
  },
};
