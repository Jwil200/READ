module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "indent": [
      0
    ],
    "max-len": [
      0
    ],
    "func-call-spacing": [
      0
    ],
    "no-unexpected-multiline": [
      0
    ],
    "no-trailing-spaces": [
      0
    ],
    "key-spacing": [
      0
    ],
    "quotes": [
      0
    ],
    "comma-dangle": [
      0
    ],
    "semi": [
      0
    ],
    "arrow-parens": [
      0
    ],
    "eol-last": [
      0
    ],
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
