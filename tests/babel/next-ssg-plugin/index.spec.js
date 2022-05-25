const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const nextSSGPlugin = require('tarojs-plugin-platform-nextjs/babel/next-ssg-plugin')

pluginTester({
    plugin: nextSSGPlugin,
    pluginName: 'next-ssg-plugin',
    babelOptions: {
        plugins: ['@babel/plugin-syntax-jsx']
    },
    fixtures: path.join(__dirname, '__fixtures__')
})
