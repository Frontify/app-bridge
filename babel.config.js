module.exports = (api) => ({
    presets: [
        [
            "@babel/preset-env",
            {
                forceAllTransforms: api.env("production"),
                corejs: 3,
                useBuiltIns: "usage",
            },
        ],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
    ],
});
