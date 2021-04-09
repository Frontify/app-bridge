const path = require("path");

const config = {
    entry: "./src/AppBridge.ts",
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
        filename: "AppBridge.js",
        libraryTarget: "umd",
        library: "AppBridge",
        umdNamedDefine: true,
    },
};

module.exports = config;
