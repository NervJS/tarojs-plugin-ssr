const config = {
    sourceRoot: 'src',
    outputRoot: 'dist',
    projectName: 'config',
    framework: 'react',
    plugins: [
        ['tarojs-plugin-platform-nextjs', {
            runNextjs: false,
            browser: false
        }]
    ],
    h5: {
        router: {
            mode: 'browser',
            customRoutes: {
                '/pages/post/index': '/post'
            }
        }
    }
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }

    return merge({}, config, require('./prod'))
}
