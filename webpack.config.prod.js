const baseConfig = require("./webpack.config.base");

const config = { mode: "production", devtool: "source-map" };

module.exports = { ...baseConfig, ...config };
