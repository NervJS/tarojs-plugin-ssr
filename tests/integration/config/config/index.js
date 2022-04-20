const path = require('path')

const config = {
    sourceRoot: 'src',
    outputRoot: 'dist',
    projectName: 'config',
    framework: 'react',
    plugins: [
        path.resolve(__dirname, '../../../../src')
    ]
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }

    return merge({}, config, require('./prod'))
}
