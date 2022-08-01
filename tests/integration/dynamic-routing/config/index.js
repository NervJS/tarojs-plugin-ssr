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
    ]
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }

    return merge({}, config, require('./prod'))
}
