const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const taroAppPlugin = require('../../../template/@tarojs/babel-plugins/next-app')

pluginTester({
    plugin: taroAppPlugin,
    pluginName: 'next-app-plugin',
    pluginOptions: {
        taroAppFilePath: path.join(__dirname, 'app.js')
    },
    babelOptions: {
        plugins: ['@babel/plugin-syntax-jsx']
    },
    fixtures: path.join(__dirname, '__fixtures__')
})
