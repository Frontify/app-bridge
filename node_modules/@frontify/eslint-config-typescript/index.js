module.exports = {
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  extends: [
    "@frontify/eslint-config-basic",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    // As we're using @typescript-eslint it's recommended to turn off
    // the standard eslint rule for unused variables and use the @typescript-eslint rule instead.
    // See here: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
