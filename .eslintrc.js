module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': "babel-eslint",
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'max-len': [2, 120],
  },
  "overrides": [
    {
      "files": ["src/routes/*", "src/models/*"],
      "rules": {
        "new-cap": "off",
      }
    }
  ],
};
