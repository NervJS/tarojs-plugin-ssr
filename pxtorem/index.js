const BASE_FONT_SIZE = 40

const withPXToREM = (designWidth = 750) => config => {
    const plugins = config.plugins || []

    return {
        ...config,
        plugins: [
            [require.resolve('postcss-pxtorem'), {
                rootValue: BASE_FONT_SIZE * designWidth / 640,
                propWhiteList: [],
                exclude: /node_modules/
            }],
            ...plugins
        ]
    }
}

module.exports = withPXToREM
