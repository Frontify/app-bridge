//eslint-disable-next-line
const path = require("path");

const config = {
    entry: {
        index: "./src/index.ts",
        "react/index": "./src/react/index.ts",
    },
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
    externals: { react: "React" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
};

module.exports = config;
