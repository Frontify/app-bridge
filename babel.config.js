module.exports = (api) => ({
    presets: [
        [
            "@babel/preset-env",
            {
                forceAllTransforms: api.env("production"),
            },
        ],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
    ],
});
