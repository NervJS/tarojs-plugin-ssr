# tarojs-plugin-platform-nextjs

让 Taro H5 支持 [Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering)、[SSR](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) 和 [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)，提升页面首屏速度 🚀，利于 SEO 🔍。


> 请 Star 🌟 这个项目来表达你的喜爱 ❤️ 和支持。

## 安装与使用

你需要先拥有一个 Taro 项目，如果你还不知该如何创建一个 Taro 项目，请先从这里开始：[Taro 安装及使用](https://taro-docs.jd.com/taro/docs/)。

### 安装

本项目以 Taro 插件的形式存在，且依赖于 Next.js，你需要在你的 Taro 项目中安装**本插件**和 **Next.js**。

```bash
npm install tarojs-plugin-platform-nextjs next
```

```bash
yarn add tarojs-plugin-platform-nextjs next
```

注意：原理上支持任意版本 Next.js，但目前仅对 10.1.2 版本做过测试。

### 配置

在 Taro 项目的 `config/index.js` 中添加插件。

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

产出目录下是一个**完整的 Next.js 应用**，你也可直接使用 next 命令启动它：

```bash
npx next start dist -p 10086
```

## 谁在使用

<p align="center">
  <a href="https://lemon.baidu.com/wiki" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://user-images.githubusercontent.com/19852293/180333671-19ec30f9-480e-4841-a0a9-40841da81e80.png" alt="Beauty wiki logo">
  </a>
</p>

## 主要功能

### Pre-rendering - 预渲染

插件默认 Pre-rendering 所有页面。这意味着提前为每个页面生成 HTML，而不是让浏览器端 JavaScript 完成所有工作。预渲染可以带来更好的性能和搜索引擎优化。

示例 - [房贷计算器](https://github.com/SyMind/Taro-Mortgage-Calculator)

> 阅读 Next.js 文档了解更多：[Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering)。

### SSR - 服务端渲染

在页面中导出 `getServerSideProps` 函数来使用 SSR 功能，插件将对每个请求使用 `getServerSideProps` 返回的数据预先渲染该页面。

```javascript
export async function getServerSideProps(context) {
    return {
        props: {} // 将作为页面组件的属性
    }
}
```

示例 - [Data Fetch Demo](https://github.com/NervJS/tarojs-plugin-platform-nextjs/tree/main/examples/data-fetch)

> 阅读 Next.js 文档了解更多：[getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)。

### ISR - 增量静态生成

在页面导出 `getStaticProps` 函数并对其添加 `revalidate` 属性来使用 ISR 功能。

ISR 功能允许你单独对某个页面进行增量静态生成，无需重新生成整个网站。使用 ISR，你可以在数百万页面的规模上同时保留静态的好处。

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

示例 - [GitHub Reactions Demo](https://github.com/NervJS/tarojs-plugin-platform-nextjs/tree/main/examples/reactions)

> 阅读 Next.js 文档了解更多：[Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)。

### 自定义 Next.js 配置

可以在项目的 `config` 目录下添加 `next.config.js` 文件来自定义 Next.js 应用的相关配置。

如自定义 H5 应用的基本路径（basePath）：

```javascript
module.exports = {
    basePath: '/swan'
}
```

> 阅读 Next.js 文档了解更多：[next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction)。

## 注意事项

### 功能限制

由于插件基于 Next.js 框架，故受其影响，有以下限制：

1. 仅支持 `browser` 路由模式。
2. 组件级样式必须使用 CSS Module。

### 获取路由参数

Taro 有两种获取路由参数的方式，一种是调用方法 `getCurrentInstance().router.params`，另一种是使用 React Hook `useRouter().params`。

推荐使用 `useRouter` 来获取路由参数，因为它内部直接使用 Next.js 提供的 `useRouter` React Hook 实现，具有很好的一致性。

你仍可以使用 `getCurrentInstance` 方法，大多数情况它都会运行的很好。但明白插件是如何处理该方法，会让你避免遇到一些问题时不知所措。

当你在一个类组件中调用 `getCurrentInstance` 时，在编译阶段插件会在该组件外部使用 Next.js 的 `withRouter` 方法进行包装，让类组件能够响应 Next.js 路由的变化。

```javascript
+ import {withRouter} from 'next/router'

class MyComponent extends Component {
    $instance = getCurrentInstance()

    render() {
        console.log(this.$instance.router)
        return null
    }
}

- export default MyComponent
+ export default withRouter(MyComponent)
```

## Taro 组件的 React 实现

Taro 官方的 H5 组件库是基于 Stencil 框架开发，为了更好的性能和兼容性，本项目使用完全基于 React 开发的 Taro 组件库 [@taror/components](https://nervjs.github.io/tarojs-plugin-platform-nextjs/)。

## 参与建设

十分欢迎大家参与对插件问题的修复和功能的改进，如果你有任何问题，都可以在本项目的 issue 中进行提问！

### 本地编译

使用以下命令在本地编译插件

```bash
yarn install

yarn lerna run build
```

### 架构设计

你可以通过阅读[架构设计](./ARCHITECTURE.md)来了解本插件的工作原理。

### 贡献者

<table>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/SyMind">
                    <img
                        src="https://avatars.githubusercontent.com/u/19852293?s=120&v=4"
                        width="100"
                        alt=""
                    >
                    </br>
                    <b>SyMind</b>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/zygoing">
                    <img
                        src="https://avatars.githubusercontent.com/u/39304222?s=120&v=4"
                        width="100"
                        alt=""
                    >
                    </br>
                    <b>zygoing</b>
                </a>
            </td>
        </tr>
    </tbody>
</table>

## License

[MIT](https://github.com/NervJS/tarojs-plugin-platform-nextjs/blob/main/LICENSE)
