const baseConfig = require("./webpack.config.base");

const config = { mode: "development", devtool: "eval", watch: true };

module.exports = { ...baseConfig, ...config };
