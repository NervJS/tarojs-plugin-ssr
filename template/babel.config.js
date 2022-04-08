const path = require('path')

module.exports = {
    presets: ['next/babel'],
    plugins: [
        path.resolve(__dirname, './@tarojs/babel-plugins/next-app'),
        path.resolve(__dirname, './@tarojs/babel-plugins/taro-app'),
        path.resolve(__dirname, './@tarojs/babel-plugins/taro-import'),
        path.resolve(__dirname, './@tarojs/babel-plugins/class-component-taro-router')
    ]
}
