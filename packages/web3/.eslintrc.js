module.exports = {
  extends: ["@niconiahi/eslint-config/web3"],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
}
