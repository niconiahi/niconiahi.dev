module.exports = {
  ...require('@niconiahi/config/eslint.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}