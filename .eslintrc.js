module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@stylistic/eslint-plugin-js',
    '@typescript-eslint/eslint-plugin',
  ],
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    /**@description typescript rules */
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    /** @description stylistic rules */
    '@stylistic/js/key-spacing': 'error',
    '@stylistic/js/semi-spacing': 'error',
    '@stylistic/js/comma-spacing': 'error',
    '@stylistic/js/no-multi-spaces': 'warn',
    '@stylistic/js/keyword-spacing': 'error',
    '@stylistic/js/space-infix-ops': 'error',
    '@stylistic/js/no-trailing-spaces': 'error',
    '@stylistic/js/rest-spread-spacing': 'error',
    '@stylistic/js/switch-colon-spacing': 'warn',
    '@stylistic/js/template-curly-spacing': 'error',
    '@stylistic/js/block-spacing': ['error', 'always'],
    '@stylistic/js/space-in-parens': ['error', 'never'],
    '@stylistic/js/no-whitespace-before-property': 'error',
    '@stylistic/js/space-before-blocks': ['error', 'always'],
    '@stylistic/js/array-bracket-spacing': ['error', 'never'],
    '@stylistic/js/function-call-spacing': ['error', 'never'],
    '@stylistic/js/template-tag-spacing': ['error', 'always'],
    '@stylistic/js/computed-property-spacing': ['error', 'never'],
    '@stylistic/js/no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
    '@stylistic/js/arrow-spacing': ['error', {before: true, after: true} ],
    '@stylistic/js/object-curly-spacing': ['error', 'always', {arraysInObjects: true, objectsInObjects: true} ],
    '@stylistic/js/space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
  },
};
