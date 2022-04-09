module.exports = function withPXToREM(config) {
    const plugins = config.plugins || []

    return {
        ...config,
        plugins: [
            [require.resolve('postcss-pxtorem'), {
                rootValue: 20 / 320 * 414 * 3,
                propWhiteList: []
            }],
            ...plugins
        ]
    }
}
