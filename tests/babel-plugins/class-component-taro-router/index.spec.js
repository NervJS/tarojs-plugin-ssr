const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const taroRouterPlugin = require('../../../template/@tarojs/babel-plugins/class-component-taro-router')

pluginTester({
    plugin: taroRouterPlugin,
    pluginName: 'class-component-taro-router-plugin',
    fixtures: path.join(__dirname, '__fixtures__')
})
