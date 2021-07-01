//eslint-disable-next-line
const path = require("path");

const config = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.(ts|js)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-typescript"],
                        },
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
};

module.exports = config;
