# tarojs-plugin-platform-nextjs

Taro 插件，用于编译为 Next.js 应用。

<strong>⚠️ 本插件目前处于早期建设中，不建议用于生产环境！</strong>

## 动机

让 Taro3 在 web 端支持 SSR，提升页面首屏加载速度。

## 使用

```bash
# 安装
npm install tarojs-plugin-platform-nextjs
# 执行
taro build --type nextjs
```

taro 项目配置中添加插件：

```javascript
const config = {
    plugins: [
        'tarojs-plugin-platform-nextjs'
    ]
}
```

## 注意

Next.js 中组件样式必须使用 CSS Module。

## License

[MIT](https://github.com/SyMind/tarojs-plugin-platform-nextjs/blob/main/LICENSE)
