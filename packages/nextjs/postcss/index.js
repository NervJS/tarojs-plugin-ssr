const BASE_FONT_SIZE = 40

const withTaro = (designWidth, autoprefixerOption) => config => {
    const plugins = config.plugins || []

    plugins.push(
        [require.resolve('postcss-pxtorem'), {
            rootValue: BASE_FONT_SIZE * designWidth / 640,
            propWhiteList: [],
            exclude: /(node_modules|tarojs-plugin-platform-nextjs)/
        }]
    )

    plugins.push(
        [require.resolve('postcss-pxtorem'), {
            rootValue: BASE_FONT_SIZE / 1.5,
            propWhiteList: [],
            exclude(file) {
                return !/tarojs-plugin-platform-nextjs/.test(file)
            }
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
