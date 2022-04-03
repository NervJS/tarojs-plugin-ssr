const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const taroRouterPlugin = require('../../../template/@tarojs/babel-plugins/taro-router')

pluginTester({
    plugin: taroRouterPlugin,
    pluginName: 'taro-router-plugin',
    fixtures: path.join(__dirname, '__fixtures__')
})
