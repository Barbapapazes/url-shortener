import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'unused-imports/no-unused-imports': 'off', // disabled to avoid to remove `h` import.
  },
})
