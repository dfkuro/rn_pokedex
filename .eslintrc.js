// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    jest: true,
  },
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
