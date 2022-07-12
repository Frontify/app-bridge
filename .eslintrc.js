module.exports = {
    extends: ['@frontify/eslint-config-react'],
    plugins: ['eslint-plugin-tsdoc'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'tsdoc/syntax': 'warn',
    },
};
