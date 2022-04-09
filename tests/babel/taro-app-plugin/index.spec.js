const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const taroAppPlugin = require('../../../babel/taro-app-plugin')

pluginTester({
    plugin: taroAppPlugin,
    pluginName: 'taro-app-plugin',
    fixtures: path.join(__dirname, '__fixtures__')
})
