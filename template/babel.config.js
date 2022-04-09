module.exports = {
    presets: ['next/babel'],
    plugins: [
        require.resolve('tarojs-plugin-platform-nextjs/babel/next-app-plugin'),
        require.resolve('tarojs-plugin-platform-nextjs/babel/taro-app-plugin'),
        require.resolve('tarojs-plugin-platform-nextjs/babel/taro-import-plugin'),
        require.resolve('tarojs-plugin-platform-nextjs/babel/class-component-taro-router-plugin')
    ]
}
