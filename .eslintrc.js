module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    '@nuxtjs/eslint-config-typescript',
    '@vue/eslint-config-typescript/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-var': 'error',
    'no-unused-vars': 'warn',
    'unicorn/error-message': 'off',
    eqeqeq: 'warn',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    'vue/return-in-computed-property': 'warn',
    'vue/multi-word-component-names': 'off',
    // This option "multiline-arguments" does not work here, so I use "multiline"
    'function-paren-newline': ['error', 'multiline'],
    'dot-notation': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
