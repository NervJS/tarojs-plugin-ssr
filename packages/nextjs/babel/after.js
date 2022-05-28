function afterPreset(api, options = {}) {
    const isServer = api.caller(caller => !!caller && caller.isServer)
    const {taroPages} = options

    return {
        sourceType: 'unambiguous',
        plugins: [
            !isServer && [
                require.resolve('tarojs-plugin-platform-nextjs/babel/taro-ssg-plugin'),
                {taroPages}
            ]
        ].filter(Boolean)
    }
}

module.exports = afterPreset
