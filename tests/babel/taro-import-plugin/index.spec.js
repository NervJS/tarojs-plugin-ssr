const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const taroImportPlugin = require('tarojs-plugin-platform-nextjs/babel/taro-import-plugin')

pluginTester({
    plugin: taroImportPlugin,
    pluginName: 'taro-import-plugin',
    fixtures: path.join(__dirname, '__fixtures__')
})
