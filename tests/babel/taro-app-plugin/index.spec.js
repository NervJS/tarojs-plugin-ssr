const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const taroAppPlugin = require('tarojs-plugin-platform-nextjs/babel/taro-app-plugin')

pluginTester({
    plugin: taroAppPlugin,
    pluginName: 'taro-app-plugin',
    pluginOptions: {
        outputAppFilePath: path.join(__dirname, '__fixtures__/basic/code.js')
    },
    fixtures: path.join(__dirname, '__fixtures__')
})
