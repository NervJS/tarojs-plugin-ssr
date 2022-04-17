const BASE_FONT_SIZE = 40

const withTaro = (designWidth = 750, autoprefixerOption) => config => {
    const plugins = config.plugins || []

    plugins.push(
        [require.resolve('postcss-pxtorem'), {
            rootValue: BASE_FONT_SIZE * designWidth / 640,
            propWhiteList: [],
            exclude: /node_modules/
        }]
    )

    if (autoprefixerOption) {
        plugins.push(
            [require.resolve('autoprefixer'), autoprefixerOption]
        )
    }

    return {
        ...config,
        plugins
    }
}

module.exports = withTaro
