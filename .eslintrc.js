module.exports = {
    extends: [
      'plugin:jest/recommended',
    ],
    plugins: [
      'import',
      'jest',
    ],
    env: {
      node: true,
      'jest/globals': true,
      "es6": true
    },
  };