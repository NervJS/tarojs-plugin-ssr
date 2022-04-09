# tarojs-plugin-platform-nextjs

Taro 插件，用于编译为 Next.js 应用。

<strong>⚠️ 本插件目前处于早期建设中，不建议用于生产环境！</strong>

## 动机

让 Taro3 在 web 端支持 SSR，提升页面首屏加载速度。

## 使用

### 安装

```bash
# 安装插件
pnpm install tarojs-plugin-platform-nextjs

# 安装 next.js
pnpm install next
```

### 配置

在 Taro 项目配置中添加插件。

```javascript
const config = {
    plugins: [
        'tarojs-plugin-platform-nextjs'
    ]
}
```

### 执行

```bash
# 开发
npx taro build --type nextjs --watch

# 打包
npx taro build --type nextjs
```

## 注意

Next.js 中组件样式必须使用 CSS Module。

## License

[MIT](https://github.com/SyMind/tarojs-plugin-platform-nextjs/blob/main/LICENSE)
