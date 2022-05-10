module.exports = {
  extends: ["@niconiahi/eslint-config/remix"],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
}
