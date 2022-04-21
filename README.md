# tarojs-plugin-platform-nextjs

Taro 插件，用于编译为 Next.js 应用。

<strong>⚠️ 本插件目前处于早期建设中，不建议用于生产环境！</strong>

## 动机

让 Taro 在 Web 端支持 [SSR](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) 和 [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)，以提升页面首屏速度。

## 安装与使用

### 安装

你需要先拥有一个 Taro 项目，如果你还不知该如何创建一个 Taro 项目，那么请先从这里开始：[Taro 安装及使用](https://taro-docs.jd.com/taro/docs/)。

```bash
# 使用 npm 安装插件与 next.js
npm install tarojs-plugin-platform-nextjs next

# 使用 pnpm 安装插件与 next.js
pnpm install tarojs-plugin-platform-nextjs next
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

### 开发环境

```bash
npx taro build --type nextjs --watch
```

### 生产环境

项目必须先使用以下命令进行编译：

```bash
npx taro build --type nextjs
```

启动应用：

```bash
npx taro start -p 10086
```

产出目录下是一个完整的 Next.js 应用，也可直接使用 next 命令启动它：

```bash
npx next start dist -p 10086
```

## 基础教程

### 编译配置

本插件使用 Taro 项目中 h5 端的编译配置，但有以下限制。

1. Next.js 仅支持 `browser` 路由模式。
2. Next.js 中组件级样式必须使用 CSS Module。

### SSR

在页面中导出 `getServerSideProps` 函数，Next.js 将对每个请求使用 `getServerSideProps` 返回的数据预先渲染该页面。

阅读 Next.js 文档了解更多：[getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)。

```javascript
export async function getServerSideProps(context) {
    return {
        props: {} // 将作为页面组件的属性
    }
}
```

### ISR

Next.js 的 Incremental Static Regeneration（ISR）功能允许你单独对某个页面使用静态生成，无需重建整个网站。使用 ISR，你可以在数百万页面的规模上同时保留静态的好处。

在页面导出 `getStaticProps` 并对其添加 `revalidate` 属性来使用 ISR。

```javascript
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Next.js 将尝试重新生成页面
    // - 当接受到一个请求
    // - 最多每 10 秒一次
    revalidate: 10 // 单位为秒
  }
}
```

## 示例

[房贷计算器](https://github.com/SyMind/Taro-Mortgage-Calculator)

## License

[MIT](https://github.com/SyMind/tarojs-plugin-platform-nextjs/blob/main/LICENSE)
