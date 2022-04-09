const path = require('path')

module.exports = {
    presets: ['next/babel'],
    plugins: [
        path.resolve('tarojs-plugin-platform-nextjs/babel/next-app-plugin'),
        path.resolve('tarojs-plugin-platform-nextjs/babel/taro-app-plugin'),
        path.resolve('tarojs-plugin-platform-nextjs/babel/taro-import-plugin'),
        path.resolve('tarojs-plugin-platform-nextjs/babel/class-component-taro-router-plugin')
    ]
}
