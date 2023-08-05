const getPostCssConfig = require('tarojs-plugin-platform-nextjs/postcss')

// 读取 Taro 的编译配置 https://docs.taro.zone/docs/config/
// Taro SSR 插件暂不支持使用 ts 文件
module.exports = getPostCssConfig(require('./config/index.js'))
