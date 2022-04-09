const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const nextAppPlugin = require('../../../babel/next-app-plugin')

pluginTester({
    plugin: nextAppPlugin,
    pluginName: 'next-app-plugin',
    pluginOptions: {
        outputAppFilePath: path.join(__dirname, 'app.js'),
        nextAppFilePath: path.join(__dirname, '__fixtures__/basic/code.js')
    },
    babelOptions: {
        plugins: ['@babel/plugin-syntax-jsx']
    },
    fixtures: path.join(__dirname, '__fixtures__')
})
