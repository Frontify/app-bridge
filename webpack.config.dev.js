//eslint-disable-next-line
const baseConfig = require("./webpack.config.base");

const config = { mode: "development", devtool: "eval-source-map", watch: true };

module.exports = { ...baseConfig, ...config };
