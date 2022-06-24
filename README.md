# tarojs-plugin-platform-nextjs

Taro 插件，让 Taro H5 支持 [Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering)、[SSR](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) 和 [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)，提升页面首屏速度🚀，利于 SEO🔍，基于 Next.js。

> 请 Star 🌟 这个项目来表达你的喜爱 ❤️ 和支持。

<strong>⚠️ 本插件目前处于早期建设中，不建议用于生产环境！</strong>

## 安装与使用

### 安装

> 你需要先拥有一个 Taro 项目，如果你还不知该如何创建一个 Taro 项目，请先从这里开始：[Taro 安装及使用](https://taro-docs.jd.com/taro/docs/)。

在 Taro 项目中安装本插件。

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

## 主要功能

### Pre-rendering - 预渲染

插件默认 Pre-rendering 所有页面。这意味着提前为每个页面生成 HTML，而不是让浏览器端 JavaScript 完成所有工作。预渲染可以带来更好的性能和搜索引擎优化。

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

> 阅读 Next.js 文档了解更多：[Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)。

## 注意事项

### 功能限制

插件受 Next.js 框架的约束，有以下限制：

1. 仅支持 `browser` 路由模式。
2. 组件级样式必须使用 CSS Module。

### 获取路由参数

#### 方法的表现差异

你在获取页面查询参数时，可能会发生值为空的情况：

```javascript
// 当前的查询参数：?q=1
const MyComponent = () => {
    const q = useRouter().router.params.q
    
    useEffect(() => {
        console.log(`get q = ${q}`) // get q = undefined
    }, [])
}
```

这是由于 Next.js 的同构渲染机制导致的。

在浏览器接受到从服务端返回而来的 html 页面后，会先执行 React 的 hydrate 方法，组件触发第一次渲染。之后 Next.js 才会将完整的路由信息传入，组件触发第二次渲染。所以，上述组件需要做以下修改：

```javascript
// 当前的查询参数：?q=1
const MyComponent = () => {
    const q = useRouter().router.params.q
    
    useEffect(() => {
        if (q) {
            console.log(`get q = ${q}`) // get q = 1
        }
    }, [q]) // 将 q (或 router) 加入到 Hook 的依赖列表中
}
```

#### 方法的内部处理细节

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

## 示例

[房贷计算器](https://github.com/SyMind/Taro-Mortgage-Calculator)

## License

[MIT](https://github.com/SyMind/tarojs-plugin-platform-nextjs/blob/main/LICENSE)
