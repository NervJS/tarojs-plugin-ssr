function beforePreset(api, options = {}) {
    const {nextAppFilePath, outputAppFilePath} = options

    return {
        sourceType: 'unambiguous',
        plugins: [
            require.resolve('tarojs-plugin-platform-nextjs/babel/class-component-taro-router-plugin'),
            [
                require.resolve('tarojs-plugin-platform-nextjs/babel/next-app-plugin'),
                {
                    nextAppFilePath,
                    outputAppFilePath
                }
            ],
            [
                require.resolve('tarojs-plugin-platform-nextjs/babel/taro-app-plugin'),
                {outputAppFilePath}
            ],
            require.resolve('tarojs-plugin-platform-nextjs/babel/taro-import-plugin')
        ]
    }
}

module.exports = beforePreset
