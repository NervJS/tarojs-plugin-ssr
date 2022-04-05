const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const taroAppPlugin = require('../../../template/@tarojs/babel-plugins/taro-app')

pluginTester({
    plugin: taroAppPlugin,
    pluginName: 'taro-app-plugin',
    fixtures: path.join(__dirname, '__fixtures__')
})
