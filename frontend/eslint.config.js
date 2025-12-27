import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  formatters: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  rules: {
    'vue/no-reserved-component-names': 'off',
  },
})
