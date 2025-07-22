import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'no-empty': 'off',
    semi: ['error', 'always'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'space-before-function-paren': ['off'],
    'vue/multi-word-component-names': ['off'],
    'vue/first-attribute-linebreak': 'off',
    'vue/require-default-prop': 'off'
  },
});
