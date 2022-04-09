const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const nextAppPlugin = require('../../../babel/next-app-plugin')

pluginTester({
    plugin: nextAppPlugin,
    pluginName: 'next-app-plugin',
    pluginOptions: {
        taroAppFilePath: path.join(__dirname, 'app.js')
    },
    babelOptions: {
        plugins: ['@babel/plugin-syntax-jsx']
    },
    fixtures: path.join(__dirname, '__fixtures__')
})
