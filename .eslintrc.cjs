module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   "parser": "@babel/eslint-parser",
  //   "requireConfigFile": false
  // },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    // "@typescript-eslint/no-var-requires": "off",
    "react-hooks/exhaustive-deps": "off",
  },
}
