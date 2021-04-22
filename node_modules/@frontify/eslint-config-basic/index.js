module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    "prettier/prettier": "error",
  },
  plugins: ["html", "prettier"],
  extends: ["plugin:prettier/recommended"],
};
