# tarojs-plugin-platform-nextjs

Taro 插件，用于编译为 Next.js 应用。

<strong>⚠️ 本插件目前处于早期建设中，不建议用于生产环境！</strong>

## 动机

让 Taro 在 Web 端支持 [SSR](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) 和 [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)，以提升页面首屏速度。

## 安装与使用

### 安装

你需要先拥有一个 Taro 项目，如果你还不知该如何创建一个 Taro 项目，那么请先从这里开始：[Taro 安装及使用](https://taro-docs.jd.com/taro/docs/)。

```bash
# 安装插件
pnpm install tarojs-plugin-platform-nextjs

# 安装 next.js
pnpm install next
```

### 配置

在 Taro 项目的[编译配置](https://taro-docs.jd.com/taro/docs/config)中添加本插件。

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

## 基础教程

### 编译配置

本插件使用 Taro 项目中 h5 端的编译配置，但有以下限制。

1. Next.js 仅支持 `browser` 路由模式。
2. Next.js 中组件级样式必须使用 CSS Module。

### 页面如何进行 SSR

在页面中导出 `getServerSideProps` 函数，Next.js 将对每个请求使用 `getServerSideProps` 返回的数据预先渲染该页面。

阅读 Next.js 文档了解更多：[getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)。

```javascript
export async function getServerSideProps(context) {
    return {
        props: {} // 将作为页面组件的属性
    }
}
```

## 示例

[房贷计算器](https://github.com/SyMind/Taro-Mortgage-Calculator)

## License

[MIT](https://github.com/SyMind/tarojs-plugin-platform-nextjs/blob/main/LICENSE)
